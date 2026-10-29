import SwiftUI

struct ProductView: View {
    let productId: String
    @EnvironmentObject private var cart: Cart
    @EnvironmentObject private var router: Router

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 10) {
                if let p = Catalog.find(productId) {
                    VStack(alignment: .leading, spacing: 8) {
                        Thumbnail(product: p, size: 220, fullWidth: true)
                        Text(p.name).font(.title3.bold()).padding(.top, 6)
                        Text("\u{2605} \(p.rating, specifier: "%.1f")  \u{00B7}  \(p.category)")
                            .font(.subheadline).foregroundStyle(.secondary)
                        HStack(alignment: .firstTextBaseline, spacing: 8) {
                            Text(Catalog.rupees(p.price)).font(.title.bold())
                            Text(Catalog.rupees(p.mrp)).strikethrough().foregroundStyle(.secondary)
                            Text("\(p.discountPercent)% off").bold().foregroundStyle(Color(hex: 0x388E3C))
                        }
                        Text(p.description)
                        Text("Product ID: \(p.id)").font(.footnote).foregroundStyle(.secondary)
                    }
                    .padding(14)
                    .background(Color.white, in: RoundedRectangle(cornerRadius: 8))

                    let inCart = cart.qty(of: p.id)
                    Button(inCart > 0 ? "Add another (\(inCart) in cart)" : "Add to cart") { cart.add(p.id) }
                        .buttonStyle(FilledButton(color: .accent))
                    Button("Go to cart") { router.path.append(.cart) }
                        .buttonStyle(FilledButton(color: .brand))
                } else {
                    VStack(alignment: .leading, spacing: 6) {
                        Text("Product not found").font(.headline)
                        Text("No product with id \"\(productId)\".").foregroundStyle(.secondary)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(14)
                    .background(Color.white, in: RoundedRectangle(cornerRadius: 8))
                }
            }
            .padding(12)
            .foregroundStyle(Color.primary)
        }
        .background(Color.page)
        .shopHeader("Product")
    }
}
