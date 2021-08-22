import React, { Component } from "react";

export default class ButtonLoader extends Component {
  state = {
    loading: false
  };

  fetchData = () => {
    this.setState({ loading: true });

    //API call here for fetching data
    setTimeout(() => {
      this.setState({ loading: false });
    }, 5000);
  };

  render() {
    const { loading } = this.state;

    return (
      <div style={{ marginTop: "60px" }}>
        <button className="button" onClick={this.fetchData} disabled={loading}>
          {loading && (
            <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "15px" }}
            />
          )}
          {loading && <span>Loading...</span>}
          {!loading && <span>Submit Button</span>}
        </button>
      </div>
    );
  }
}
