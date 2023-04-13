import { useLocalStorageState, useTitle } from 'ahooks';
import { Converter } from 'showdown'
import { loadTOC } from '../../src/content/load'
import '../../src/content/style.css'
import '../../src/content/Tree.css'
import './App.css'
import { useEffect } from 'react';

const converter = new Converter()


function App() {

  useTitle("Awesome Toc")

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

  useEffect(() => {
    loadTOC()
  }, [content])

  return <div className='app'>
    <textarea className="input"
      onChange={({ target: {
        value
      } }) => setContent(value)
      }
      value={content}
    />
    <article className="out">
      <div dangerouslySetInnerHTML={contentInnerHtml}></div>
    </article>
  </div >
}

export default App
