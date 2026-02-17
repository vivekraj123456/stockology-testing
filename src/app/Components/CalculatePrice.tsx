import React from "react";

const CalculatePrice = () => {
  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-100">
      <h3 className="text-lg font-medium">Pricing Details</h3>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="text-left">Tax/Charge</th>
            <th className="text-right">Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left">STT (Securities Transaction Tax)</td>
            <td className="text-right">0.025%</td>
          </tr>
          <tr>
            <td className="text-left">Transaction Charges</td>
            <td className="text-right">0.00345%</td>
          </tr>
          <tr>
            <td className="text-left">GST (Goods and Services Tax)</td>
            <td className="text-right">18%</td>
          </tr>
          <tr>
            <td className="text-left">SEBI Charges</td>
            <td className="text-right">0.0001%</td>
          </tr>
          <tr>
            <td className="text-left">Stamp Duty</td>
            <td className="text-right">0.003%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CalculatePrice;