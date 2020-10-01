<template>
    <div class="alert-section">
        <div class="alert alert-element" :class="classes">
            <div class="icon">
                <img src="/icon/bell.svg" alt="notification icon" />
            </div>
            <div class="text">
                <span class="white-text">
                    <strong>{{ body }}</strong>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'flash',

        props: ['message'],

        data() {
            return {
                body: this.message,
                level: 'success',
                duration: 3000,
                show: false,
            };
        },
        created() {
            window.events.$on('flash', data => this.flash(data));
        },

        computed: {
            classes() {
                return this.show ? `is-active alert-${this.level}` : ``;
            },
        },

        methods: {
            flash(data) {
                if (data) {
                    this.body = data.message;
                    this.level = data.level;
                }
                this.show = true;

                this.hide(data.duration);
            },

            hide(duration) {
                setTimeout(() => {
                    this.show = false;
                }, duration);
            },
        },
    };
</script>

<style scoped>
    .icon img {
        width: 50px;
        height: auto;
    }
    .alert-section .alert-element {
        z-index: 1000;
        position: fixed;
        top: 50px;
        right: 25px;
        color: rgba(255, 255, 255, 1);
        border-radius: 4px;
        font-weight: 800;
        display: flex;
        align-items: stretch;
        padding-right: 20px;
        perspective: 1000px;
        opacity: 0;
        transform-origin: bottom left;
        transform: rotate(90deg) scale(0.5) translate(100px, -300px) rotateX(90deg);
        transition: all 500ms cubic-bezier(0, 0.6, 0.35, 1.4);
    }
    .alert-section .alert-element .icon {
        padding: 20px;
        background: transparent;
        color: white;
        border-radius: 4px 0px 0px 4px;
        overflow: hidden;
    }
    .alert-section .alert-element .icon i {
        transform: scale(0.2) translateY(50px);
        opacity: 0;
        transition: all 500ms cubic-bezier(0, 0.6, 0.35, 1.4) 400ms;
    }

    .alert-section .alert-element .text {
        background: transparent;
        padding: 0 20px;
        display: flex;
        align-items: center;
        border-radius: 0px 4px 4px 0px;
        transform: rotateY(90deg);
        transition: all 500ms ease-in-out 250ms;
        transform-origin: center left;
        opacity: 0;
    }
    .alert-section .alert-element.is-active {
        opacity: 1;
        transform: rotate(0deg) scale(1);
    }
    .alert-section .alert-element.is-active .material-icons {
        transform: scale(1) translateY(0px);
        opacity: 1;
    }
    .alert-section .alert-element.is-active .text {
        transform: rotateY(0deg);
        opacity: 1;
    }
    .alert-success {
        background-color: lightgreen;
    }
    .alert-danger {
        background-color: red;
    }
    .alert-primary {
        background-color: blue;
    }
</style>
