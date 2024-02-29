<template>
    <div class="main">
        <form @submit.prevent="submitLogin" class="form-login">
            <input type="text" placeholder="Имя пользователя" v-model="form.username" />
            <input type="password" placeholder="Пароль" v-model="form.password">
            <button type="submit">Войти</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },

    methods: {
        ...mapActions({
            login: 'auth/login'
        }),

        submitLogin() {
            this.login(this.form)
        }
    }
}
</script>
  
<style scoped lang="sass">
.main
    display: flex
    justify-content: center
    align-items: center
    min-height: 100vh

.form-login
    display: flex
    flex-direction: column
    grid-gap: 30px


    & input
        padding: 15px
        background: $purple
        color: $white
        font-size: 16px
        border-radius: 15px
        flex-grow: 1
        font-weight: 600

        &::placeholder
            color: $white
            opacity: .7

    & button
        background: $blue
        padding: 15px 25px
        border-radius: 15px
        color: $white
        font-size: 16px
        font-weight: 600
        cursor: pointer
        transition: $trs

        &:hover
            background: $light-blue
            color: $primary
</style>  