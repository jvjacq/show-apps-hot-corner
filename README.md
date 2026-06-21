# Show Apps Hot Corner

A GNOME Shell extension that opens the app grid when your mouse hits a configurable screen corner.

## Features

- Trigger the GNOME app grid by moving your mouse to any corner
- Configurable corner position via Extension Manager preferences (top-left, top-right, bottom-left, bottom-right)
- Defaults to bottom-left

## Installation

### From extensions.gnome.org (recommended)

Search for "Show Apps Hot Corner" in [Extension Manager](https://flathub.org/apps/com.mattjakeman.ExtensionManager) or visit the extension page on [extensions.gnome.org](https://extensions.gnome.org).

### Manual

```bash
git clone https://github.com/jvjacq/show-apps-hot-corner ~/.local/share/gnome-shell/extensions/show-apps-hot-corner@jvjacq.com
glib-compile-schemas ~/.local/share/gnome-shell/extensions/show-apps-hot-corner@jvjacq.com/schemas/
gnome-extensions enable show-apps-hot-corner@jvjacq.com
```

## Supported GNOME versions

45, 46, 47, 48, 49, 50

## License

GPL-2.0
