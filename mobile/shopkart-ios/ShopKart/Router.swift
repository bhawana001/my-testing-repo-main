import Foundation

enum Route: Hashable {
    case product(String)
    case cart
}

/**
 Supported links (same as Android):
   shopkart://home
   shopkart://search?q=shoes
   shopkart://product/p101
   shopkart://cart
   shopkart://cart?add=p101&qty=2
 */
final class Router: ObservableObject {
    @Published var path: [Route] = []
    @Published var query = ""
    @Published var notice: String?

    func open(_ url: URL, cart: Cart) {
        guard url.scheme == "shopkart", let host = url.host else { return unknown(url) }
        let items = URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems ?? []
        func param(_ name: String) -> String? { items.first { $0.name == name }?.value }
        let segments = url.pathComponents.filter { $0 != "/" }

        switch host {
        case "home":
            query = ""
            path = []
        case "search":
            query = param("q") ?? ""
            path = []
        case "product":
            guard let id = segments.first else { return unknown(url) }
            path = [.product(id)]
        case "cart":
            if let add = param("add"), Catalog.find(add) != nil {
                cart.add(add, qty: max(1, Int(param("qty") ?? "") ?? 1))
            }
            path = [.cart]
        default:
            unknown(url)
        }
    }

    private func unknown(_ url: URL) {
        path = []
        notice = "Link not recognised: \(url.absoluteString)"
    }
}
