import React from 'react'
import { useState } from 'react'
import { MathpixMarkdown, MathpixLoader } from 'mathpix-markdown-it'

export default function Lemma(props) {
  const [title, setTitle] = useState(props.lemma.title)
  const [proof, setProof] = useState(props.lemma.proof)
  const [theoremsUsed, setTheoremsUsed] = useState(
    props.lemma.theoremsUsed.map((d) => d._id).toString()
  )
  const [defsUsed, setDefsUsed] = useState(
    props.lemma.definitionsUsed.map((d) => d._id).toString()
  )
  // const [createDefinition, { data }] = useMutation(CREATE_DEFINITION)

  function handleSubmit(event) {
    event.preventDefault()
    const definitionsUsed = defsUsed.split(',')
    // edit definition
    // createDefinition({
    //   variables: { sec_id: props.parentId, title, content, definitionsUsed },
    // })
  }

  function handleChange(event) {
    setProof(event.target.value)
    event.preventDefault()
  }

  return (
    <details key={props.lemma._id}>
      <summary>
        ID: {props.lemma._id}
        <MathpixLoader>
          <MathpixMarkdown text={props.lemma.title} />
        </MathpixLoader>
      </summary>
      <MathpixLoader>
        <MathpixMarkdown text={proof} />
      </MathpixLoader>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <br />
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          Proof:
          <br />
          <textarea name="proof" value={proof} onChange={handleChange} />
          <br />
          Definitions Used:
          <br />
          <textarea
            name="defsUsed"
            value={defsUsed}
            onChange={(e) => setDefsUsed(e.target.value)}
          />
          <br />
          Theorems Used:
          <br />
          <textarea
            name="theoremsUsed"
            value={theoremsUsed}
            onChange={(e) => setTheoremsUsed(e.target.value)}
          />
        </label>
        <br></br>
        <input type="submit" value="Update" />
      </form>
    </details>
  )
}
