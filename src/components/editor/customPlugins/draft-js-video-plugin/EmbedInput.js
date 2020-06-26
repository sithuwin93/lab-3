import React, { Component } from 'react'
import { EmbedContainer, EmbedInput } from './styled'
import Icon from 'src/components/icon';
import {
    MediaLabel,
    MediaInput,
  } from 'src/components/chatInput/components/style';
class EmbedInputComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: ''
    }
  }

  onChange = (e) => {
    this.setState({url: e.target.value})
  }

  onKeyDown = (event) => {
    const { onSubmit } = this.props
    const { url } = this.state

    if (event.key === 'Enter') {
      event.preventDefault()
      onSubmit(url)
    }
  }

  render() {
    const { onSubmit, close } = this.props
    const { url } = this.state

    return (
      <React.Fragment>
        <EmbedContainer>
          <EmbedInput
            autoFocus
            type="text"
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            placeholder="Enter embedded address"
          />
        </EmbedContainer>
        <MediaLabel>
          <Icon onClick={() => onSubmit(url)} glyph="send-fill2" />
        </MediaLabel>
        <MediaLabel>
          <Icon onClick={close} glyph="cancel" />
        </MediaLabel>

      </React.Fragment>

    )
  }
}

export default EmbedInputComponent