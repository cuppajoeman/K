import React from 'react'
import { useMutation, gql, Mutation } from '@apollo/client'
import { useState } from 'react'
import { MathpixMarkdownModel as MM } from 'mathpix-markdown-it'

const CREATE_PROPOSITION = gql`
  mutation CreateProposition(
    $sec_id: ID!
    $title: String!
    $proof: String
    $knowledgeUsed: [ID!]
  ) {
    createProposition(
      sec_id: $sec_id
      title: $title
      proof: $proof
      knowledgeUsed: $knowledgeUsed
    ) {
      title
      proof
    }
  }
`
export default function NewPropositionForm() {
  const [result, setResult] = useState('')
  const [title, setTitle] = useState('')
  const [proof, setProof] = useState('')
  const [knowledgeUsed, setKnowledgeUsed] = useState('')
  const [createProposition, { data }] = useMutation(CREATE_PROPOSITION)

  function handleSubmit(event) {
    event.preventDefault()
    const kU = knowledgeUsed.split(',')
    createProposition({
      variables: { sec_id: 3, title, proof, knowledgeUsed: kU },
    })
  }

  function handleChange(event) {
    setProof(event.target.value)
    event.preventDefault()
    setResult(MM.markdownToHTML(proof))
  }

  return (
    <div>
      <h4>Create a new proposition:</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          Proof:
          <textarea name="proof" value={proof} onChange={handleChange} />
          Definitions Used:
          <textarea
            name="knowledgeUsed"
            value={knowledgeUsed}
            onChange={(e) => setKnowledgeUsed(e.target.value)}
          />
        </label>
        <div
          id="preview-content"
          dangerouslySetInnerHTML={{ __html: result }}
        />
        <br></br>
        <input type="submit" value="Create" />
      </form>
    </div>
  )
}
