import Foundation

@objc public class Clipboard: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
