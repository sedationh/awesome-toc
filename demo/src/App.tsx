import { useLocalStorageState } from 'ahooks';
import { Converter } from 'showdown'
import './App.css'

const converter = new Converter()

function App() {
  const [content, setContent] = useLocalStorageState<string>(
    'content',
    {
      defaultValue: `# 1
# 1-1
### 1-1-1
### 1-1-2
## 1-2
#2
#3`,
    },
  );

  const contentInnerHtml = {
    __html: converter.makeHtml(content)
  }

  return <div className='app'>
    <textarea className="input"
      onChange={({ target: {
        value
      } }) => setContent(value)
      }
      value={content}
    />
    <section className="out">
      <div dangerouslySetInnerHTML={contentInnerHtml}></div>
    </section>
  </div >
}

export default App
