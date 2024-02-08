export class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}
export class LinkedList {
  constructor(head = null) {
    this.head = head
  }
  addElement(element, secondElement = null) {
    let current = secondElement || this.head
    let node = new Node(element)
    if (current === null) return (this.head = node)

    let prev = current
    if (current.next === null) {
      current.next = node
    } else {
      prev = current
      current = current.next
      this.addElement(element, current)
    }
  }

  deleteElement() {
    if (this.head === null) return
    if (this.head.next === null) return (this.head = null)
    let lastNode = this.head
    let tempNode = this.head
    if (lastNode) {
      while (lastNode.next) {
        tempNode = lastNode
        lastNode = lastNode.next
      }
      tempNode.next = null
    }
  }
}
