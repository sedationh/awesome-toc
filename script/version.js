import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

// 获取版本类型参数 (patch|minor|major)
const versionType = process.argv[2] || "patch";
const validVersionTypes = ["patch", "minor", "major"];

if (!validVersionTypes.includes(versionType)) {
	console.error("Invalid version type. Use: patch, minor, or major");
	process.exit(1);
}

try {
	// 读取当前版本
	const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
	const currentVersion = packageJson.version;
	const [major, minor, patch] = currentVersion.split(".").map(Number);

	// 计算新版本号
	let newVersion;
	switch (versionType) {
		case "major":
			newVersion = `${major + 1}.0.0`;
			break;
		case "minor":
			newVersion = `${major}.${minor + 1}.0`;
			break;
		case "patch":
			newVersion = `${major}.${minor}.${patch + 1}`;
			break;
	}

	// 更新 package.json
	packageJson.version = newVersion;
	writeFileSync("package.json", JSON.stringify(packageJson, null, 2) + "\n");

	// Git 操作
	execSync('git add package.json', { stdio: "inherit" });
	execSync(`git commit -m "chore: bump version to ${newVersion}"`, { stdio: "inherit" });
	execSync(`git tag -a v${newVersion} -m "Version ${newVersion}"`, { stdio: "inherit" });
	execSync("git push", { stdio: "inherit" });
	execSync(`git push origin v${newVersion}`, { stdio: "inherit" });

	console.log(`\nSuccessfully published version ${newVersion}`);
} catch (error) {
	console.error("Error during publish:", error);
	process.exit(1);
}
