import { useState } from "react";
import classNames from "classnames";

export default function SelectDistance({
  func,
}: {
  func: (value: number) => void;
}) {
  const [selectedDistance, setSelectedDistance] = useState<string | null>(null);
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Distance Range
      </label>
      <div className="grid grid-cols-3 gap-2">
        <div
          onClick={() => {
            setSelectedDistance("10m");
            func(10);
          }}
          className={classNames(
            "py-3 border cursor-pointer px-4 rounded-lg text-center transition-colors text-gray-700",
            {
              "!border-[#3b82f6]": selectedDistance === "10m",
              "!bg-[#3b82f6]/10": selectedDistance === "10m",
              "!border-[#d1d5db]": selectedDistance !== "10m",
              "hover:!bg-gray-100": selectedDistance !== "10m",
            },
          )}
        >
          <div
            className={classNames("font-medium", {
              "text-[#3b82f6]": selectedDistance === "10m",
              "text-gray-700": selectedDistance !== "10m",
            })}
          >
            10m
          </div>
          <div className="text-xs mt-1 text-gray-500">Small range</div>
        </div>
        <div
          onClick={() => {
            setSelectedDistance("30m");
            func(30);
          }}
          className={classNames(
            "py-3 border cursor-pointer px-4 rounded-lg text-center transition-colors text-gray-700",
            {
              "!border-[#3b82f6]": selectedDistance === "30m",
              "!bg-[#3b82f6]/10": selectedDistance === "30m",
              "!border-[#d1d5db]": selectedDistance !== "30m",
              "hover:!bg-gray-100": selectedDistance !== "30m",
            },
          )}
        >
          <div
            className={classNames("font-medium", {
              "text-[#3b82f6]": selectedDistance === "30m",
              "text-gray-700": selectedDistance !== "30m",
            })}
          >
            30m
          </div>
          <div className="text-xs mt-1 text-gray-500">Standart range</div>
        </div>
        <div
          onClick={() => {
            setSelectedDistance("50m");
            func(50);
          }}
          className={classNames(
            "py-3 border cursor-pointer px-4 rounded-lg text-center transition-colors text-gray-700",
            {
              "!border-[#3b82f6]": selectedDistance === "50m",
              "!bg-[#3b82f6]/10": selectedDistance === "50m",
              "!border-[#d1d5db]": selectedDistance !== "50m",
              "hover:!bg-gray-100": selectedDistance !== "50m",
            },
          )}
        >
          <div
            className={classNames("font-medium", {
              "text-[#3b82f6]": selectedDistance === "50m",
              "text-gray-700": selectedDistance !== "50m",
            })}
          >
            50m
          </div>
          <div className="text-xs mt-1 text-gray-500">Long range</div>
        </div>
      </div>
    </div>
  );
}
