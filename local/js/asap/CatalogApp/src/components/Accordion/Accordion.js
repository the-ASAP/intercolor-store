import './Accordion.css';

export const Accordion = {
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    toggleAccordeon() {
      this.isOpen = !this.isOpen;
    },
  },
  template: `
    <div class="accordion" :class="{'accordion--active': isOpen}">
      <div class="accordion__header" @click="toggleAccordeon">
        <slot name="title"/>
        <svg class="accordion__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M8 10L12 14L16 10" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="accordion__container">
        <slot name="content"/>        
      </div>
    </div>
  `,
};
