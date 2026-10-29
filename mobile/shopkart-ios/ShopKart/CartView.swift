import SwiftUI

struct CartView: View {
    @EnvironmentObject private var cart: Cart
    @EnvironmentObject private var router: Router
    @State private var placedOrder: (id: String, total: Int)?

    var body: some View {
        ScrollView {
            VStack(spacing: 10) {
                if let order = placedOrder {
                    card {
                        Image(systemName: "checkmark.circle.fill").font(.system(size: 48)).foregroundStyle(Color(hex: 0x388E3C))
                        Text("Order placed!").font(.title2.bold())
                        Text("Order ID: \(order.id)")
                        Text("Amount paid: \(Catalog.rupees(order.total))")
                    }
                    Button("Continue shopping") { router.path = [] }
                        .buttonStyle(FilledButton(color: .brand))
                } else if cart.lines.isEmpty {
                    card {
                        Text("Your cart is empty").font(.headline)
                        Text("Add items to it now.").foregroundStyle(.secondary)
                    }
                    Button("Shop now") { router.path = [] }
                        .buttonStyle(FilledButton(color: .brand))
                } else {
                    ForEach(cart.lines, id: \.id) { line in
                        if let p = Catalog.find(line.id) { CartRow(product: p, qty: line.qty) }
                    }
                    VStack(alignment: .leading, spacing: 6) {
                        Text("Price details").font(.headline)
                        Text("Items: \(cart.count)")
                        Text("Delivery: FREE").foregroundStyle(Color(hex: 0x388E3C))
                        Text("Total: \(Catalog.rupees(cart.total))").font(.title3.bold())
                            .accessibilityIdentifier("cart-total")
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(14)
                    .background(Color.white, in: RoundedRectangle(cornerRadius: 8))
                    Button("Place order") {
                        placedOrder = ("SK\(Int.random(in: 100000...999999))", cart.total)
                        cart.clear()
                    }
                    .buttonStyle(FilledButton(color: .accent))
                }
            }
            .padding(12)
            .foregroundStyle(Color.primary)
        }
        .background(Color.page)
        .shopHeader("My Cart")
    }

    private func card<C: View>(@ViewBuilder _ content: () -> C) -> some View {
        VStack(spacing: 6, content: content)
            .frame(maxWidth: .infinity)
            .padding(14)
            .background(Color.white, in: RoundedRectangle(cornerRadius: 8))
    }
}

struct CartRow: View {
    let product: Product
    let qty: Int
    @EnvironmentObject private var cart: Cart

    var body: some View {
        HStack(spacing: 12) {
            Thumbnail(product: product, size: 64)
            VStack(alignment: .leading, spacing: 6) {
                Text(product.name).font(.subheadline.bold())
                Text(Catalog.rupees(product.price * qty))
                HStack(spacing: 14) {
                    stepper("minus", label: "Decrease \(product.name)") { cart.setQty(product.id, qty - 1) }
                    Text("\(qty)").bold().accessibilityLabel("Quantity of \(product.name) \(qty)")
                    stepper("plus", label: "Increase \(product.name)") { cart.setQty(product.id, qty + 1) }
                    Button("Remove") { cart.setQty(product.id, 0) }
                        .font(.subheadline.bold())
                        .foregroundStyle(Color.brand)
                        .accessibilityLabel("Remove \(product.name)")
                }
            }
            Spacer(minLength: 0)
        }
        .padding(14)
        .background(Color.white, in: RoundedRectangle(cornerRadius: 8))
    }

    private func stepper(_ icon: String, label: String, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Image(systemName: icon).font(.caption.bold()).frame(width: 32, height: 32)
                .background(Color(hex: 0xEEEEEE), in: Circle())
        }
        .foregroundStyle(Color.primary)
        .accessibilityLabel(label)
    }
}
