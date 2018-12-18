import React from 'react';

import Checkbox from '@instructure/ui-forms/lib/components/Checkbox';

export class Toggle extends React.Component {
  state = {
    checked: false
  };

  /*
   * NOTE: These are toy examples. You probably don't want to call setState
   * asynchronously in a real component (see
   * https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html). Consider
   * using an app-level store such as redux, and passing state in as props.
   */
  handleChange = async () => {
    const response = await this.props.apiUpdate({ checked: !this.state.checked });
    this.setState(response);
  };

  render() {
    return (
      <Checkbox
        checked={this.state.checked}
        label="Toggle"
        onChange={this.handleChange}
        size="large"
        variant="toggle"
      />
    );
  }
}

export class TogglePessimistic extends React.Component {
  state = {
    checked: false,
    messages: null,
    updating: false
  };

  /*
   * NOTE: These are toy examples. You probably don't want to call setState
   * asynchronously in a real component (see
   * https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html). Consider
   * using an app-level store such as redux, and passing state in as props.
   */
  handleChange = async () => {
    if (this.state.updating) return;
    this.setState({ updating: true });

    try {
      const response = await this.props.apiUpdate({ checked: !this.state.checked });
      this.setState({ checked: response.checked, messages: null });
    } catch (e) {
      this.setState({ messages: [{ type: 'error', text: e.message }] })
    } finally {
      // NOTE: 
      this.setState({ updating: false });
    }
  };

  render() {
    return (
      <Checkbox
        checked={this.state.checked}
        disabled={this.state.updating}
        label="Toggle (pessimistic)"
        messages={this.state.messages}
        onChange={this.handleChange}
        size="large"
        variant="toggle"
      />
    );
  }
}

export class ToggleOptimistic extends React.Component {
  state = {
    checked: false,
    messages: null
  };

  /*
   * NOTE: These are toy examples. You probably don't want to call setState
   * asynchronously in a real component (see
   * https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html). Consider
   * using an app-level store such as redux, and passing state in as props.
   */
  handleChange = async () => {
    const originalState = { checked: this.state.checked };
    const updatedState = { checked: !this.state.checked };
    // TODO: cancel inflight request
    this.setState(updatedState);

    try {
      await this.props.apiUpdate({ ...updatedState, messages: null });
    } catch (e) {
      this.setState({ ...originalState, messages: [{ type: 'error', text: e.message }] });
    }
  };

  render() {
    return (
      <Checkbox
        checked={this.state.checked}
        label="Toggle (optimistic)"
        messages={this.state.messages}
        onChange={this.handleChange}
        size="large"
        variant="toggle"
      />
    );
  }
}
