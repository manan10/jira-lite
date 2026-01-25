import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // 1. Update state so the next render shows the fallback UI
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // 2. Log the error (e.g., to Sentry or console)
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 border border-red-100 dark:border-red-900/30 text-center">
            
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="text-red-600 dark:text-red-400 w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Something went wrong
            </h2>
            
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Don't worry, your data is safe. It's just a temporary glitch in the interface.
            </p>

            <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-lg text-left mb-6 overflow-auto max-h-32">
              <code className="text-xs text-red-500 font-mono">
                {this.state.error?.message}
              </code>
            </div>

            <button
              onClick={this.handleReload}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCcw size={18} />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}