import React, { Component } from "react";
import { connect } from "react-redux";
import { actSubmitUser } from "./../store/actions";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        id: "",
        fullname: "",
        phoneNumber: "",
        email: "",
      },
      errors: {
        id: "",
        fullname: "",
        phoneNumber: "",
        email: "",
      },
    };
    this.closeModal = React.createRef();
  }

  handleOnchange = (event) => {
    const { name, value, pattern } = event.target;
    const newValues = { ...this.state.values, [name]: value };
    let newErrors = { ...this.state.errors };
    if (!value.trim()) {
      newErrors[name] = "Vui lòng nhập thông tin";
    } else {
      if (pattern) {
        const regex = new RegExp(pattern);
        const valid = regex.test(value);
        if (!valid) {
          newErrors[name] = `${name} không đúng định dạng`;
        } else {
          newErrors[name] = "";
        }
        console.log("valid", name, valid);
      } else {
        if (value.length <= 4) {
          console.log("Do dai qua ngan");
          newErrors[name] = "Do dai qua ngan";
        } else {
          newErrors[name] = "";
        }
      }
    }

    this.setState({
      [name]: value,
      values: newValues,
      errors: newErrors,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitUser(this.state);
    this.closeModal.current.click();
    let isValid = true;
    Object.values(this.state.errors).forEach((item) => {
      if (item) {
        isValid = false;
      }
    });

    if (isValid) {
      console.log("values", this.state.values);
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { editUser } = nextProps;
  
    if (editUser) {
      this.setState({
        id: editUser.id,
        fullname: editUser.fullname,
        email: editUser.email,
        phoneNumber: editUser.phoneNumber,
      });
    } else {
      this.setState({
        id: "",
        fullname: "",
        email: "",
        phoneNumber: "",
      });
    }
  }
  

  render() {
    const { errors } = this.state;
    return (
      <div
        className="modal fade"
        id="modelIdUser"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {this.props.editUser ? "EDIT USER" : "ADD USER"}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                ref={this.closeModal}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ID"
                    onChange={this.handleOnchange}
                    value={this.state.id}
                    onBlur={this.handleOnchange}
                  />
                  {errors.id && (
                      <span className="text text-danger">{errors.id}</span>
                    )}
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullname"
                    onChange={this.handleOnchange}
                    value={this.state.fullname}
                    onBlur={this.handleOnchange}
                    min={4}
                  />
                  {errors.fullname && (
                    <span className="text text-danger">{errors.fullname}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    onChange={this.handleOnchange}
                    value={this.state.email}
                    onBlur={this.handleOnchange}
                  />
                  {errors.email && (
                    <span className="text text-danger">{errors.email}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    onChange={this.handleOnchange}
                    value={this.state.phoneNumber}
                    onBlur={this.handleOnchange}
                    pattern="^(03|05|07|08|09)\d{8}$"
                  />
                   {errors.phoneNumber && (
                      <span className="text text-danger">{errors.phoneNumber}</span>
                    )}
                </div>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editUser: state.userReducer.editUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitUser: (user) => {
      dispatch(actSubmitUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
