import {
  AlertCircle,
  ArrowLeft,
  HomeIcon,
  LifeBuoy,
  Shield,
} from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen min-w-screen bg-white text-slate-900 flex items-center justify-center relative">
      <div className="container max-w-3xl px-6 py-2">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-lg p-8 md:p-12">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-6">
              <div className="bg-blue-600 p-4 rounded-full inline-flex items-center justify-center mb-2">
                <Shield className="h-10 w-10 text-white" strokeWidth={1.5} />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span>Access Denied</span>
              <AlertCircle
                className="h-6 w-6 text-blue-600"
                strokeWidth={1.5}
              />
            </h1>

            <h2 className="text-xl md:text-2xl text-blue-600 font-semibold mb-6">
              You are not authorized to view this page
            </h2>

            <div className="bg-slate-50 text-slate-600 rounded-2xl p-6 mb-8 max-w-xl border border-slate-100">
              <p className="mb-4">
                This area requires additional permissions that your current
                account doesn't have. If you believe this is an error, please
                contact the administrator or your instructor team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
