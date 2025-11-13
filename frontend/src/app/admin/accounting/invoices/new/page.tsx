"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Customer {
  id: string;
  customer_name: string;
  company_name?: string;
  payment_terms?: string;
}

interface LineItem {
  item_number: number;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

export default function NewInvoicePage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customer_id: "",
    invoice_date: new Date().toISOString().split("T")[0],
    due_date: "",
    payment_terms: "Net 30",
    tax_rate: 0,
    notes: "",
    memo: "",
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([
    { item_number: 1, description: "", quantity: 1, unit_price: 0, amount: 0 },
  ]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    // Auto-calculate due date when invoice date or payment terms change
    if (formData.invoice_date && formData.payment_terms) {
      const invoiceDate = new Date(formData.invoice_date);
      let daysToAdd = 30; // Default

      if (formData.payment_terms === "Due on Receipt") daysToAdd = 0;
      else if (formData.payment_terms === "Net 15") daysToAdd = 15;
      else if (formData.payment_terms === "Net 30") daysToAdd = 30;
      else if (formData.payment_terms === "Net 45") daysToAdd = 45;
      else if (formData.payment_terms === "Net 60") daysToAdd = 60;

      const dueDate = new Date(invoiceDate);
      dueDate.setDate(dueDate.getDate() + daysToAdd);

      setFormData((prev) => ({
        ...prev,
        due_date: dueDate.toISOString().split("T")[0],
      }));
    }
  }, [formData.invoice_date, formData.payment_terms]);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("status", "active")
        .order("customer_name");

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    setFormData({
      ...formData,
      customer_id: customerId,
      payment_terms: customer?.payment_terms || "Net 30",
    });
  };

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        item_number: lineItems.length + 1,
        description: "",
        quantity: 1,
        unit_price: 0,
        amount: 0,
      },
    ]);
  };

  const removeLineItem = (index: number) => {
    if (lineItems.length === 1) return; // Keep at least one line
    const newItems = lineItems.filter((_, i) => i !== index);
    // Renumber items
    newItems.forEach((item, i) => {
      item.item_number = i + 1;
    });
    setLineItems(newItems);
  };

  const updateLineItem = (index: number, field: keyof LineItem, value: string | number) => {
    const newItems = [...lineItems];
    newItems[index] = { ...newItems[index], [field]: value };

    // Recalculate amount
    if (field === "quantity" || field === "unit_price") {
      newItems[index].amount = newItems[index].quantity * newItems[index].unit_price;
    }

    setLineItems(newItems);
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (formData.tax_rate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.customer_id) {
        alert("Please select a customer");
        setLoading(false);
        return;
      }

      // Generate invoice number
      const { count } = await supabase
        .from("invoices")
        .select("*", { count: "exact", head: true });

      const invoiceNumber = `INV-${new Date().getFullYear()}-${String((count || 0) + 1).padStart(4, "0")}`;

      const subtotal = calculateSubtotal();
      const taxAmount = calculateTax();
      const totalAmount = calculateTotal();

      // Create invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from("invoices")
        .insert([
          {
            customer_id: formData.customer_id,
            invoice_number: invoiceNumber,
            invoice_date: formData.invoice_date,
            due_date: formData.due_date,
            subtotal,
            tax_rate: formData.tax_rate,
            tax_amount: taxAmount,
            total_amount: totalAmount,
            amount_paid: 0,
            balance_due: totalAmount,
            status: "draft",
            payment_terms: formData.payment_terms,
            notes: formData.notes,
            memo: formData.memo,
          },
        ])
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      // Create invoice line items
      const itemsToInsert = lineItems
        .filter((item) => item.description.trim() !== "")
        .map((item) => ({
          invoice_id: invoice.id,
          item_number: item.item_number,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          amount: item.amount,
        }));

      if (itemsToInsert.length === 0) {
        alert("Please add at least one line item");
        // Delete the invoice we just created
        await supabase.from("invoices").delete().eq("id", invoice.id);
        setLoading(false);
        return;
      }

      const { error: itemsError } = await supabase.from("invoice_items").insert(itemsToInsert);

      if (itemsError) {
        // Rollback: Delete the invoice
        await supabase.from("invoices").delete().eq("id", invoice.id);
        throw itemsError;
      }

      alert("Invoice created successfully!");
      router.push("/admin/accounting/invoices");
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Failed to create invoice");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2c2c2c] text-white flex-shrink-0">
        <div className="p-6">
          <Image
            src="/logo.jpg"
            alt="MC Smart Bytes"
            width={180}
            height={45}
            className="h-10 w-auto mb-2"
          />
          <p className="text-xs text-gray-400">Professional Accounting Platform</p>
        </div>

        <nav className="px-4">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Dashboard
            </h3>
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white"
            >
              <span>📊</span>
              <span>Overview</span>
            </Link>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Accounting
            </h3>
            <Link
              href="/admin/accounting"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#3c3c3c] text-gray-300 hover:text-white"
            >
              <span>💰</span>
              <span>Accounting Tools</span>
            </Link>
            <Link
              href="/admin/accounting/invoices"
              className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#3c3c3c] text-white mt-1"
            >
              <span>📄</span>
              <span>Invoices (AR)</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Create New Invoice</h1>
            <p className="text-sm text-gray-600 mt-1">Fill in the details below to create an invoice</p>
          </div>
          <Link
            href="/admin/accounting/invoices"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
        </header>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="max-w-5xl mx-auto">
            {/* Invoice Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Invoice Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer *
                  </label>
                  <select
                    required
                    value={formData.customer_id}
                    onChange={(e) => handleCustomerChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  >
                    <option value="">Select a customer</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.customer_name}
                        {customer.company_name ? ` - ${customer.company_name}` : ""}
                      </option>
                    ))}
                  </select>
                  {customers.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      No customers found.{" "}
                      <Link href="/admin/accounting/customers" className="text-blue-600 hover:underline">
                        Add a customer first
                      </Link>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Terms
                  </label>
                  <select
                    value={formData.payment_terms}
                    onChange={(e) =>
                      setFormData({ ...formData, payment_terms: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  >
                    <option value="Due on Receipt">Due on Receipt</option>
                    <option value="Net 15">Net 15</option>
                    <option value="Net 30">Net 30</option>
                    <option value="Net 45">Net 45</option>
                    <option value="Net 60">Net 60</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Invoice Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.invoice_date}
                    onChange={(e) =>
                      setFormData({ ...formData, invoice_date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.due_date}
                    onChange={(e) =>
                      setFormData({ ...formData, due_date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.tax_rate}
                    onChange={(e) =>
                      setFormData({ ...formData, tax_rate: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Line Items</h2>
                <button
                  type="button"
                  onClick={addLineItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                >
                  + Add Line
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Qty</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="px-4 py-3 text-sm text-gray-700">{item.item_number}</td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            required
                            value={item.description}
                            onChange={(e) => updateLineItem(index, "description", e.target.value)}
                            placeholder="Description of service/product"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#D2691E]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            value={item.quantity}
                            onChange={(e) => updateLineItem(index, "quantity", parseFloat(e.target.value) || 0)}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-[#D2691E]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            value={item.unit_price}
                            onChange={(e) => updateLineItem(index, "unit_price", parseFloat(e.target.value) || 0)}
                            className="w-24 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-[#D2691E]"
                          />
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                          {formatCurrency(item.amount)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {lineItems.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeLineItem(index)}
                              className="text-red-600 hover:text-red-900 text-sm"
                            >
                              ✕
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="mt-6 flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax ({formData.tax_rate}%):</span>
                    <span className="font-medium text-gray-900">{formatCurrency(calculateTax())}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-[#D2691E]">{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (visible to customer)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Thank you for your business!"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Memo (internal use only)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.memo}
                    onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                    placeholder="Internal notes..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Link
                href="/admin/accounting/invoices"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#D2691E] text-white rounded-md hover:bg-[#B8560F] disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Creating..." : "Create Invoice"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
