import React from 'react'
import { MathpixMarkdown, MathpixLoader } from 'mathpix-markdown-it'

class Definition extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.def.content }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          Title: {this.props.def.title}, ID: {this.props.def._id}
        </p>
        <label>
          Content:
          <MathpixLoader>
            <MathpixMarkdown text={this.state.value} />
          </MathpixLoader>
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Edit" />
        <input type="submit" value="Delete" />
      </form>
    )
  }
}

export default Definition
