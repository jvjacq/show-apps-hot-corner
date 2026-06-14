import St from 'gi://St';
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

        Main.layoutManager.addChrome(this._corner);

        this._enterId = this._corner.connect('enter-event', () => {
            Main.overview.showApps();
        });

        this._updatePosition();

        this._monitorChangedId = Main.layoutManager.connect(
            'monitors-changed',
            () => this._updatePosition()
        );

        this._settingsChangedId = this._settings.connect(
            'changed::corner',
            () => this._updatePosition()
        );
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
        if (this._settingsChangedId) {
            this._settings.disconnect(this._settingsChangedId);
            this._settingsChangedId = null;
        }
        if (this._enterId) {
            this._corner.disconnect(this._enterId);
            this._enterId = null;
        }
        if (this._monitorChangedId) {
            Main.layoutManager.disconnect(this._monitorChangedId);
            this._monitorChangedId = null;
        }
        if (this._corner) {
            Main.layoutManager.removeChrome(this._corner);
            this._corner.destroy();
            this._corner = null;
        }
        this._settings = null;
    }
}
