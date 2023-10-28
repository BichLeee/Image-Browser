import './App.css';
import CardImage from './Card';
import Spinner from './Spinner';
import { ACCESS_KEY, PER_PAGE } from './config';
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css';




function App() {
  const [keyWord, setKeyWord] = useState("")
  const [text, setText] = useState("")
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const ref_div = useRef(null)
  const ref_input = useRef(null)

  console.log(loading)

  useEffect(() => {
    setLoading(true)
    fetch(`https://api.unsplash.com/search/photos/?query=${keyWord}&page=${page}&per_page=${PER_PAGE}&client_id=${ACCESS_KEY}`)
      .then(res => res.json())
      .then(content => {
        //setImages
        if (content.results.length == 0) setIsEmpty(true);
        setImages([...images, ...content.results])
        setLoading(false)
        console.log(content)

      })
      .catch((e) => {
        setLoading(false)
        console.log("Limit Rate Exceeded")
      })
  }, [keyWord, page])

  console.log(page)

  useEffect(() => {
    const handleScroll = () => {
      const isGoToBottom = (Math.round(window.scrollY + window.innerHeight + 0.3) >= ref_div.current.offsetHeight);
      if (isGoToBottom) {
        console.log("is bottom");
        setPage(prev => parseInt(prev) + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSearch = () => {
    setLoading(true)
    setPage(1)
    setKeyWord(text)
    setImages([])
    setIsEmpty(false)
    ref_input.current.focus()
  }


  return (
    <div className="App" ref={ref_div}>
      <div className='App-header'>
        Lê Thị Ngọc Bích - 20120435
      </div>
      <div className='search-banner' style={{ textAlign: '-webkit-center', }}>
        <InputGroup className="mb-3" style={{ width: '300px' }}>
          <Form.Control
            placeholder="Input your key word..."
            value={text}
            onChange={e => setText(e.target.value)}
            className='border-info'
            ref={ref_input}
          />
          <Button
            variant="info"
            onClick={handleSearch}
          >
            Search
          </Button>
        </InputGroup>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginBlock: "20px" }}>
          {
            images.map(image => (
              <CardImage key={image.id} img_src={image.urls.small} img_alt={image.alt_description} />
            ))
          }
        </div>
        {loading && <Spinner />}
        {isEmpty && <div>No results found </div>}
      </div>

    </div>
  );
}

export default App;
