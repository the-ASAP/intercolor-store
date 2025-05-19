import './Select.css';

export const Select = {
  props: {
    sorting: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['updateSort'],
  data() {
    return {
      selectedOption: null,
      optionOrder: null,
      isOpen: false,
    };
  },
  computed: {
    getOption() {
      return this.selectedOption || 'По умолчанию';
    },
    getOptionOrder() {
      return this.optionOrder == 'asc' ? 'rotate(-90)' : 'rotate(90)';
    },
  },
  methods: {
    toggleOption(option) {
      if (this.selectedOption == option.name) return;
      this.selectedOption = option.name;
      this.optionOrder = option.order;
      this.$emit('updateSort', option);
      this.isOpen = false;
    },

    toggleSelect() {
      this.isOpen = !this.isOpen;
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
        <svg
          v-if="optionOrder"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          :transform="getOptionOrder"
        >
          <path
            d="M19 12H5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 17L19 12"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 7L19 12"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <Transition name="select-fade-slide">
        <ul v-show="isOpen" class="v-select__options" role="listbox">
          <li
            class="v-select__option v-select__option--selected"
            role="option"
            data-value=""
            v-for="option in sorting"
            :key="option.value"
            @click="toggleOption(option)"
          >
            {{option.name}}
            <svg
              v-if="option.order"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :transform="option.order == 'asc' ? 'rotate(-90)' : 'rotate(90)'"
            >
              <path
                d="M19 12H5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 17L19 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 7L19 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </li>
        </ul>
      </Transition>
    </div>
  `,
};
