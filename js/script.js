console.log('JS OK!');

console.log(contacts);

const app = new Vue({
  el: '#app',
  data: {
    activeIndex: 0,
    newMessage: '',
    searchText: '',
    deletePanelIndex: -1,
    contacts,
  },
  methods: {
    setActiveContact(index) {
      this.activeIndex = index;
    },
    sendMessage() {
      const selectedContact = this.contacts[this.activeIndex];
      selectedContact.messages.push({
        date: this.getNow(),
        message: this.newMessage,
        status: 'sent',
      });
      this.newMessage = '';
      setTimeout(() => {
        selectedContact.messages.push({
          date: this.getNow(),
          message: 'OK!',
          status: 'received',
        });
      }, 2000);
    },
    deleteMessage(index) {
      console.log('delete', index);
    },
    filterContacts() {
      console.log(this.searchText);
      this.contacts.forEach((item, index) => {
        console.log('item at pos:', index);
        item.visible =
          item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
        console.log('visible:', item.visible);
      });
    },
    showDeletePanel(event, index) {
      event.stopPropagation();
      console.log('show');
      this.deletePanelIndex = index;
    },
    closeDeletePanel() {
      console.log('close');
      this.deletePanelIndex = -1;
    },
    getHoursMinutes(dateToFormat) {
      // dateToFormat = "10/01/2020 15:30:55",
      const array = dateToFormat.split(' '); // ["10/01/2020",  "15:30:55"]
      const ora = array[1]; // "15:30:55"
      const arrayOra = ora.split(':'); // ["15", "30", "55"]
      const oreMinuti = arrayOra[0] + ':' + arrayOra[1]; // "15:30"
      return oreMinuti;
    },
    getNow() {
      const now = new Date();
      console.log(now.getHours() + ':' + now.getMinutes());

      const hours = this.formatDatePart(now.getHours());
      const minutes = this.formatDatePart(now.getMinutes());
      const seconds = this.formatDatePart(now.getSeconds());

      const day = this.formatDatePart(now.getDay());
      const month = this.formatDatePart(now.getMonth() + 1);
      const year = now.getFullYear();
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    },
    formatDatePart(datePart) {
      return datePart < 10 ? '0' + datePart : '' + datePart;
    },
  },
});
