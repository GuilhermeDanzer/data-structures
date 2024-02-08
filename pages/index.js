import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { LinkedList } from '../structures/LinkedList'
import { useEffect, useState } from 'react'
import { animated, useTransition } from '@react-spring/web'

export default function Home() {
  const [renderedLinkedList, setRenderedLinkedList] = useState()
  const [showJson, setShowJson] = useState(false)
  const [counter, setCounter] = useState(0)
  const [linkedList, setLinkedList] = useState(new LinkedList())
  const transitions = useTransition(renderedLinkedList, {
    from: { x: 100 },
    enter: { x: 0 },
    leave: { x: 100 },
    config: item => ({
      duration: 100 * item,
    }),
  })
  const renderLinkedList = () => {
    console.log('called', linkedList)
    let current = linkedList.head
    let nodes = []

    while (current !== null) {
      nodes.push(current.val)
      current = current.next
    }

    setRenderedLinkedList(nodes)
  }

  const deleteNode = () => {
    // let number = Math.floor(Math.random() * 200) + 1
    const updatedList = new LinkedList(linkedList.head)
    updatedList.deleteElement()
    if (counter === 0) return
    setCounter(counter - 1)
    setLinkedList(updatedList)
  }
  const addNewNode = () => {
    // let number = Math.floor(Math.random() * 200) + 1
    const updatedList = new LinkedList(linkedList.head)
    updatedList.addElement(counter)
    setCounter(counter + 1)
    setLinkedList(updatedList)
  }

  useEffect(() => {
    renderLinkedList()
  }, [linkedList])

  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>Linked List</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 style={{ color: 'white' }}>Linked List</h1>
        <div style={{ gap: 25, display: 'flex', marginBottom: 50 }}>
          <button
            className={styles.button}
            onClick={addNewNode}
            title="press me">
            Add Node
          </button>
          <button
            className={styles.button}
            onClick={deleteNode}
            title="press me">
            Remove Node
          </button>

          <button
            className={styles.button}
            onClick={() => setShowJson(!showJson)}
            title="press me">
            Code Linked List
          </button>
        </div>

        <div className={styles.nodeContainer}>
          {transitions((style, item) => (
            <div className={styles.nodeItemWrapper}>
              <animated.div style={style} className={styles.node} key={item}>
                <p className={styles.nodeText}>{item}</p>
              </animated.div>
              {item + 1 < renderedLinkedList.length && (
                <div className={styles.separator} />
              )}
            </div>
          ))}
        </div>
        {showJson && (
          <pre style={{ color: 'white' }}>
            {JSON.stringify(linkedList, null, 2)}
          </pre>
        )}
        <style jsx global>{`
          body {
            background: black;
          }
        `}</style>
      </div>
    </div>
  )
}
