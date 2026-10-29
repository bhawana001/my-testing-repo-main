import SwiftUI

struct HomeView: View {
    @EnvironmentObject private var cart: Cart
    @EnvironmentObject private var router: Router
    @State private var draft = ""

    var body: some View {
        NavigationStack(path: $router.path) {
            ScrollView {
                VStack(alignment: .leading, spacing: 10) {
                    HStack(spacing: 8) {
                        TextField("Search for products", text: $draft)
                            .textFieldStyle(.plain)
                            .padding(12)
                            .background(Color.white, in: RoundedRectangle(cornerRadius: 6))
                            .submitLabel(.search)
                            .onSubmit { router.query = draft }
                            .accessibilityIdentifier("search-field")
                        Button("Search") { router.query = draft }
                            .buttonStyle(FilledButton(color: .brand, fullWidth: false))
                    }

                    let results = Catalog.search(router.query)
                    Text(heading(count: results.count))
                        .font(.headline)
                        .padding(.top, 8)

                    if results.isEmpty {
                        Text("No products match your search.").foregroundStyle(.secondary)
                    }
                    ForEach(results) { product in
                        NavigationLink(value: Route.product(product.id)) {
                            ProductRow(product: product)
                        }
                        .buttonStyle(.plain)
                        .accessibilityLabel(product.name)
                    }
                }
                .padding(12)
            }
            .background(Color.page)
            .shopHeader("ShopKart")
            .navigationDestination(for: Route.self) { route in
                switch route {
                case .product(let id): ProductView(productId: id)
                case .cart: CartView()
                }
            }
        }
        .onAppear { draft = router.query }
        .onChange(of: router.query) { draft = $0 }
        .alert(router.notice ?? "", isPresented: Binding(
            get: { router.notice != nil },
            set: { if !$0 { router.notice = nil } }
        )) {
            Button("OK", role: .cancel) {}
        }
    }

    private func heading(count: Int) -> String {
        let q = router.query.trimmingCharacters(in: .whitespaces)
        if q.isEmpty { return "Top deals for you" }
        return "\(count) \(count == 1 ? "result" : "results") for \"\(q)\""
    }
}

struct ProductRow: View {
    let product: Product

    var body: some View {
        HStack(spacing: 14) {
            Thumbnail(product: product, size: 72)
            VStack(alignment: .leading, spacing: 3) {
                Text(product.name).font(.subheadline.bold())
                Text("\u{2605} \(product.rating, specifier: "%.1f")  \u{00B7}  \(product.category)")
                    .font(.caption).foregroundStyle(.secondary)
                Text("\(Catalog.rupees(product.price))   \(product.discountPercent)% off").font(.callout.bold())
            }
            Spacer(minLength: 0)
        }
        .padding(14)
        .background(Color.white, in: RoundedRectangle(cornerRadius: 8))
        .foregroundStyle(Color.primary)
    }
}

/// Coloured square with the product's initials, standing in for a photo.
struct Thumbnail: View {
    let product: Product
    let size: CGFloat
    var fullWidth = false

    var body: some View {
        RoundedRectangle(cornerRadius: 8)
            .fill(product.color)
            .frame(width: fullWidth ? nil : size, height: size)
            .frame(maxWidth: fullWidth ? .infinity : nil)
            .overlay(Text(product.initials).font(.system(size: size / 3, weight: .bold)).foregroundStyle(.white))
            .accessibilityHidden(true)
    }
}

struct FilledButton: ButtonStyle {
    let color: Color
    var fullWidth = true

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.body.bold())
            .foregroundStyle(.white)
            .padding(.vertical, 12)
            .padding(.horizontal, 16)
            .frame(maxWidth: fullWidth ? .infinity : nil)
            .background(color.opacity(configuration.isPressed ? 0.8 : 1), in: RoundedRectangle(cornerRadius: 6))
    }
}

/// Blue nav bar with the cart button and badge, shared by every screen.
struct ShopHeader: ViewModifier {
    let title: String
    @EnvironmentObject private var cart: Cart
    @EnvironmentObject private var router: Router

    func body(content: Content) -> some View {
        content
            .navigationTitle(title)
            .navigationBarTitleDisplayMode(.inline)
            .toolbarBackground(Color.brand, for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
            .toolbarColorScheme(.dark, for: .navigationBar)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        if router.path.last != .cart { router.path.append(.cart) }
                    } label: {
                        Image(systemName: "cart")
                            .overlay(alignment: .topTrailing) {
                                if cart.count > 0 {
                                    Text("\(cart.count)")
                                        .font(.caption2.bold())
                                        .foregroundStyle(.white)
                                        .padding(.horizontal, 5)
                                        .background(Color.accent, in: Capsule())
                                        .offset(x: 10, y: -8)
                                }
                            }
                    }
                    .accessibilityLabel("Cart")
                    .accessibilityValue("\(cart.count) items")
                }
            }
    }
}

extension View {
    func shopHeader(_ title: String) -> some View { modifier(ShopHeader(title: title)) }
}
