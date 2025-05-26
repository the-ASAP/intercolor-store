import './Select.css';

export const Select = {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['updateSelect'],
  data() {
    return {
      selectedOptionValue: null,
      selectedOptionOrder: null,
      selectedOptionName: null,
      isOpen: false,
    };
  },
  computed: {
    getOption() {
      return this.selectedOptionValue || 'По умолчанию';
    },
  },
  methods: {
    toggleOption(option) {
      if (this.selectedOptionName == option.name) {
        this.isOpen = false;
        return;
      }
      console.log(option);
      this.selectedOptionName = option.name;
      this.selectedOptionValue = option.value;
      this.selectedOptionOrder = option.order;
      this.$emit('updateSelect', option);
      this.isOpen = false;
    },
    toggleSelect() {
      this.isOpen = !this.isOpen;
    },
    getOrderType(order = '') {
      return order === 'asc' ? 'v-select__order-icon--rotate' : '';
    },
    handleClickOutside(event) {
      if (!this.$refs.select.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  template: `
    <div class="v-select v-select--small" :class="{'v-select--active': isOpen}" ref="select">
      <button class="v-select__trigger" :class="{'v-select__trigger--active': isOpen}" aria-haspopup="listbox" @click="toggleSelect">
        {{getOption}}
        <svg v-if="selectedOptionOrder" :class="getOrderType(selectedOptionOrder)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.99902 9.99905L12 4.99805L17.001 9.99905" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <Transition name="select-fade-slide">
        <ul v-show="isOpen" class="v-select__options" role="listbox">
          <li
            class="v-select__option"
            :class="{'v-select__option--selected': selectedOptionName === option.name}"
            role="option"
            v-for="option in options"
            :key="option.name"
            @click="toggleOption(option)"
          >
            {{option.value}}
            <svg v-if="option.order" :class="getOrderType(option.order)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6.99902 9.99905L12 4.99805L17.001 9.99905" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>            
            <svg v-if="selectedOptionName === option.name" class="v-select__active-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 6.5L9 17.5L4 12.5" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </li>
        </ul>
      </Transition>
    </div>
  `,
};
