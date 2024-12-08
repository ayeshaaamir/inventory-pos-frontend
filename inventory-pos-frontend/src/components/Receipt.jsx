import PropTypes from "prop-types";
import Barcode from "react-barcode";
import "../styles/Receipt.css";

const ReceiptComponent = ({ receipt }) => {
  const currentDate = new Date().toLocaleString();
  const receiptItems = receipt.fullCartItems || receipt.items || [];

  return (
    <div className="receipt-container p-4">
      <div className="text-center mb-3">
        <h4 className="font-bold">Style Mantra Invoice</h4>
        <p className="font-bold">Ilford Lane</p>
        <p className="font-bold">0208-911-8010</p>
      </div>

      <div className="mb-3">
        <div className="flex justify-content-between">
          <span className="font-bold">Date:</span>
          <span>{currentDate}</span>
        </div>
      </div>

      <hr />

      <table className="w-full mb-3">
        <thead>
          <tr>
            <th className="text-left">Item</th>
            <th className="text-right">Qty</th>
            <th className="text-right">Price</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {receiptItems.map((item, index) => (
            <tr key={index}>
              <td>{item.item_name}</td>
              <td className="text-right">{item.quantity}</td>
              <td className="text-right">
                £{parseFloat(item.price).toFixed(2)}
              </td>
              <td className="text-right">
                £{(item.quantity * parseFloat(item.price)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <div className="mb-3">
        <div className="flex justify-content-between">
          <span className="font-bold">Subtotal:</span>
          <span>£{parseFloat(receipt.total || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-content-between">
          <span className="font-bold">Discount:</span>
          <span>£{parseFloat(receipt.discount || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-content-between font-bold">
          <span className="font-bold">Total:</span>
          <span>£{parseFloat(receipt.paidAmount || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-content-between mt-2">
          <span className="font-bold">Payment Method:</span>
          <span>{receipt.paymentType || "N/A"}</span>
        </div>
      </div>

      <hr />

      <div className="barcode-wrapper">
        <Barcode
          value={receipt.barcode || "N/A"}
          width={1.5}
          height={40}
          displayValue={false}
        />
        <div className="flex justify-content-between">
          <span>{receipt.barcode || "N/A"}</span>
        </div>
      </div>

      <hr />

      <div className="text-center mt-3">
        <p>Thank you for your purchase!</p>

        <p>No returns or refunds on sale items.</p>
        <p>
          Exchanges allowed within 7 days with valid proof of purchase, if the
          item is in original condition.
        </p>
        <p>Orders cannot be exchanged or returned.</p>
        <p>
          No exchanges on jewellery, accessories (scarves, hijaabs, dupattas),
          for hygiene reasons.
        </p>
        <p>
          Recommended dry cleaning only; we dont guarantee materials, colours,
          slippage, or embellishments (including stones).
        </p>
        <p>
          Handcrafted jewellery is delicate and may break if not handled
          carefully.
        </p>
      </div>
    </div>
  );
};

ReceiptComponent.propTypes = {
  receipt: PropTypes.shape({
    barcode: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        barcode: PropTypes.string,
        quantity: PropTypes.number.isRequired,
      })
    ),
    fullCartItems: PropTypes.arrayOf(
      PropTypes.shape({
        item_name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
      })
    ),
    total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paidAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paymentType: PropTypes.string,
  }).isRequired,
};

export default ReceiptComponent;