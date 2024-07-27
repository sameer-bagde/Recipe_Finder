import { jsx as _jsx } from "react/jsx-runtime";
import { Component } from "react";
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    console.log("error", error);
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can log the error or send it to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return _jsx("div", { children: "Something went wrong." });
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
