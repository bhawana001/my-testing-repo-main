import SwiftUI

@main
struct ShopKartApp: App {
    @StateObject private var cart = Cart()
    @StateObject private var router = Router()

    init() {
        // White back arrow on the blue nav bar.
        UINavigationBar.appearance().tintColor = .white
    }

    var body: some Scene {
        WindowGroup {
            HomeView()
                .environmentObject(cart)
                .environmentObject(router)
                .onOpenURL { url in router.open(url, cart: cart) }
        }
    }
}
