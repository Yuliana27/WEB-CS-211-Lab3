import React from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label } from 'reactstrap';

export default class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);

    this.state = {
      email: '',
    };
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.handleValidSubmit();
    }
  }

  handleValidSubmit() {
    const { resetPasswordFunction } = this.props;
    const formData = this.state;
    resetPasswordFunction(formData.email);
  }

  render() {
    return (
      <div className="row ">
        <div className="col">
          <p className="autorization__name">
            Відновлення паролю
          </p>
          <AvForm onValidSubmit={this.handleValidSubmit}>
            <AvGroup>
              <AvInput
                id="userEmail"
                name="email"
                onChange={this.handleEmailChange}
                onKeyPress={this.handleKeyPress}
                placeholder="ylilav55547@gmail.com"
                required
                type="email"
                value={this.state.email}
              />
            </AvGroup>
            <Button  type="submit" className="enter">Підтвердити</Button>
          </AvForm>
        </div>
      </div>
    );
  }
}