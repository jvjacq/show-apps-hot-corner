import St from 'gi://St';
import GLib from 'gi://GLib';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class ShowAppsHotCorner extends Extension {
    enable() {
        this._settings = this.getSettings();

        this._corner = new St.Button({
            reactive: true,
            track_hover: true,
            width: 1,
            height: 1,
        });

        this._corner.connectObject(
            'enter-event', () => this._trigger(),
            this
        );

        Main.layoutManager.connectObject(
            'monitors-changed', () => this._updatePosition(),
            this
        );

        this._settings.connectObject(
            'changed::corner', () => this._updatePosition(),
            this
        );

        // Defer addChrome to the next main loop iteration so our button is added
        // after all other extensions, giving it the highest z-order in the chrome layer.
        this._initId = GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
            Main.layoutManager.addChrome(this._corner);
            this._updatePosition();
            this._initId = null;
            return GLib.SOURCE_REMOVE;
        });
    }

    _trigger() {
        if (Main.overview.visible)
            Main.overview.hide();
        else
            Main.overview.showApps();
    }

    _updatePosition() {
        const monitor = Main.layoutManager.primaryMonitor;
        if (!monitor) return;

        const corner = this._settings.get_string('corner');
        const left = corner.includes('left');
        const top = corner.includes('top');

        const x = left ? monitor.x : monitor.x + monitor.width - 1;
        const y = top ? monitor.y : monitor.y + monitor.height - 1;

        this._corner.set_position(x, y);
    }

    disable() {
        if (this._initId) {
            GLib.source_remove(this._initId);
            this._initId = null;
        }

        this._settings?.disconnectObject(this);
        Main.layoutManager.disconnectObject(this);

        if (this._corner) {
            this._corner.disconnectObject(this);
            Main.layoutManager.removeChrome(this._corner);
            this._corner.destroy();
            this._corner = null;
        }

        this._settings = null;
    }
}
