import React from 'react'
import { useMutation, gql, Mutation } from '@apollo/client'
import { useState } from 'react'
import { MathpixMarkdown, MathpixLoader } from 'mathpix-markdown-it'

const CREATE_PROPOSITION = gql`
  mutation CreateTheorem(
    $sec_id: ID!
    $title: String!
    $proof: String
    $definitionsUsed: [ID!]
    $theoremsUsed: [ID!]
  ) {
    createProposition(
      sec_id: $sec_id
      title: $title
      proof: $proof
      definitionsUsed: $definitionsUsed
      theoremsUsed: $theoremsUsed
    ) {
      title
      proof
    }
  }
`
export default function NewTheoremForm(props) {
  const [title, setTitle] = useState('')
  const [proof, setProof] = useState('')
  const [defsUsed, setDefsUsed] = useState('')
  const [theoremsUsed, setTheoremsUsed] = useState('')
  const [createProposition, { data }] = useMutation(CREATE_PROPOSITION)

  function handleSubmit(event) {
    event.preventDefault()
    const dU = defsUsed.split(',')
    const tU = theoremsUsed.split(',')
    createProposition({
      variables: {
        sec_id: props.parentId,
        title,
        proof,
        definitionsUsed: dU,
        theoremsUsed: tU,
      },
    })
  }

  function handleChange(event) {
    setProof(event.target.value)
    event.preventDefault()
  }

  return (
    <div>
      <h4>Create a new proposition:</h4>
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
        <br />
        <input type="submit" value="Create" />
      </form>
    </div>
  )
}
