import { Notebook, BookOpen, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NoAssignedClasses() {
  const navigate = useNavigate();
  return (
    <>
      <div className="ml-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 !pl-0 !border-none !outline-none !bg-white hover:text-gray-900 mt-3"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lectures
        </button>
      </div>
      <div className="bg-white text-slate-900 flex items-center justify-center relative">
        <div className="container max-w-3xl px-6 py-12">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-lg p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <div className="bg-blue-600 p-4 rounded-full inline-flex items-center justify-center mb-2">
                  <Notebook
                    className="h-10 w-10 text-white"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                No Lectures Assigned
              </p>

              <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-6">
                You haven't been enrolled in any lectures yet
              </p>

              <div className="bg-slate-50 text-slate-600 rounded-2xl p-6 mb-8 max-w-xl border border-slate-100">
                <p className="mb-4">
                  To get started, you'll need to be assigned to one or more
                  classes by an administrator. Once enrolled, you'll be able to
                  access your class materials and assignments here.
                </p>
                <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-slate-200">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="text-slate-700">
                    Waiting for class assignment
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
