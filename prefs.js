import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class ShowAppsHotCornerPrefs extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup({ title: 'Hot Corner' });
        page.add(group);

        const row = new Adw.ActionRow({ title: 'Corner position' });
        group.add(row);

        const corners = [
            { label: 'Top Left', value: 'top-left' },
            { label: 'Top Right', value: 'top-right' },
            { label: 'Bottom Left', value: 'bottom-left' },
            { label: 'Bottom Right', value: 'bottom-right' },
        ];

        const dropdown = new Gtk.DropDown({
            model: Gtk.StringList.new(corners.map(c => c.label)),
            valign: Gtk.Align.CENTER,
        });

        const current = settings.get_string('corner');
        dropdown.set_selected(corners.findIndex(c => c.value === current));

        dropdown.connect('notify::selected', () => {
            settings.set_string('corner', corners[dropdown.get_selected()].value);
        });

        row.add_suffix(dropdown);
        row.set_activatable_widget(dropdown);

        window.add(page);
    }
}
