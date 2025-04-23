import classNames from "classnames";
import { useState } from "react";

export default function SelectExpiration({
  func,
}: {
  func: (value: number) => void;
}) {
  const [selectedExpiration, setSelectedExpiration] = useState<string | null>(
    null,
  );

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Expiration Time
      </label>
      <div className="grid grid-cols-3 gap-2">
        <div
          onClick={() => {
            setSelectedExpiration("10m");
            func(10);
          }}
          className={classNames(
            "py-3 border cursor-pointer px-4 rounded-lg text-center transition-colors text-gray-700",
            {
              "!border-[#3b82f6]": selectedExpiration === "10m",
              "!bg-[#3b82f6]/10": selectedExpiration === "10m",
              "!border-[#d1d5db]": selectedExpiration !== "10m",
              "hover:!bg-gray-100": selectedExpiration !== "10m",
            },
          )}
        >
          <div
            className={classNames("font-medium", {
              "text-[#3b82f6]": selectedExpiration === "10m",
              "text-gray-700": selectedExpiration !== "10m",
            })}
          >
            10 mins
          </div>
          <div className="text-xs mt-1 text-gray-500">Quick session</div>
        </div>
        <div
          onClick={() => {
            setSelectedExpiration("30m");
            func(30);
          }}
          className={classNames(
            "py-3 border cursor-pointer px-4 rounded-lg text-center transition-colors text-gray-700",
            {
              "!border-[#3b82f6]": selectedExpiration === "30m",
              "!bg-[#3b82f6]/10": selectedExpiration === "30m",
              "!border-[#d1d5db]": selectedExpiration !== "30m",
              "hover:!bg-gray-100": selectedExpiration !== "30m",
            },
          )}
        >
          <div
            className={classNames("font-medium", {
              "text-[#3b82f6]": selectedExpiration === "30m",
              "text-gray-700": selectedExpiration !== "30m",
            })}
          >
            30 mins
          </div>
          <div className="text-xs mt-1 text-gray-500">Standart session</div>
        </div>
        <div
          onClick={() => {
            setSelectedExpiration("60m");
            func(60);
          }}
          className={classNames(
            "py-3 border cursor-pointer px-4 rounded-lg text-center transition-colors text-gray-700",
            {
              "!border-[#3b82f6]": selectedExpiration === "60m",
              "!bg-[#3b82f6]/10": selectedExpiration === "60m",
              "!border-[#d1d5db]": selectedExpiration !== "60m",
              "hover:!bg-gray-100": selectedExpiration !== "60m",
            },
          )}
        >
          <div
            className={classNames("font-medium", {
              "text-[#3b82f6]": selectedExpiration === "60m",
              "text-gray-700": selectedExpiration !== "60m",
            })}
          >
            60 mins
          </div>
          <div className="text-xs mt-1 text-gray-500">Long session</div>
        </div>
      </div>
    </div>
  );
}
