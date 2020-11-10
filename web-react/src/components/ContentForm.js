import React from 'react'
import { useState } from 'react'
import { MathpixMarkdown, MathpixLoader } from 'mathpix-markdown-it'

export default function Definition(props) {
  const [title, setTitle] = useState(props.def.title)
  const [content, setContent] = useState(props.def.content)
  const [defsUsed, setDefsUsed] = useState(
    props.def.definitionsUsed.map((d) => d._id).toString()
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
    setContent(event.target.value)
    event.preventDefault()
  }

  return (
    <details key={props.def._id}>
      <summary>
        ID: {props.def._id}
        <MathpixLoader>
          <MathpixMarkdown text={props.def.title} />
        </MathpixLoader>
      </summary>
      <MathpixLoader>
        <MathpixMarkdown text={content} />
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
          Content:
          <br />
          <textarea name="content" value={content} onChange={handleChange} />
          <br />
          Definitions Used:
          <br />
          <textarea
            name="defsUsed"
            value={defsUsed}
            onChange={(e) => setDefsUsed(e.target.value)}
          />
        </label>
        <br></br>
        <input type="submit" value="Update" />
      </form>
    </details>
  )
}
