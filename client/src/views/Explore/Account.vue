<template>
    <div class="account">
        <button class="account__logout" @click="logout">Выйти</button>
        <div class="account__inner">
            <div class="reset-password">
                <form @submit.prevent="changePassword(userData)" class="form-line">
                    <input 
                        type="password" 
                        name="oldPawword" 
                        placeholder="Старый пароль" 
                        v-model="userData.oldPassword" 
                    />
                    <input 
                        type="password" 
                        name="newPassword" 
                        placeholder="Новый пароль" 
                        v-model="userData.newPassword"
                    />
                    <button type="submit">Сменить</button>
                </form>
            </div>
            <section class="admin-panel" v-if="isAdmin">
                <form @submit.prevent="addUser(newUser)" class="form-line">
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Имя нового пользователя" 
                        required
                        v-model="newUser.username" 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Пароль" 
                        v-model="newUser.password"
                    />
                    <button type="submit">Добавить</button>
                </form>
                <div class="admin-panel__users">
                    <UserItem 
                        v-for="user in allUsers" 
                        :key="user.username"
                        :user="user"
                        :isAdmin="user.username == 'ADMIN'"
                    />
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UserItem from '@/components/UserItem.vue'

export default {
    components: {
        UserItem
    },

    data() {
        return {
            newUser: {
                username: '',
                password: ''
            },
            userData: {
                oldPassword: '',
                newPassword: ''
            }
        }
    },

    mounted() {
        if (this.isAdmin)
            this.fetchAllUsers();
    },

    methods: {
        ...mapActions({
            fetchAllUsers: 'admin/fetchAllUsers',
            addUser: 'admin/addUser',
            logout: 'auth/logout',
            changePassword: 'users/changePassword',
        })
    },

    computed: {
        ...mapGetters({
            isAdmin: 'auth/getIsAdmin',
            allUsers: 'admin/getAllUsers',
        })
    }
}
</script>
  
<style scoped lang="sass">
.account
    &__logout
        position: fixed
        top: 30px
        right: 30px

        background: $peach
        padding: 15px 25px
        border-radius: 15px
        color: $white
        font-size: 16px
        font-weight: 600
        cursor: pointer
        transition: $trs

        &:hover
            background: $orange

    &__inner
        min-height: 100vh
        max-width: 700px
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        grid-gap: 80px
        margin: 0 auto

.admin-panel
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    grid-gap: 80px
    width: 100%

    &__users
        width: 100%
        display: flex
        flex-direction: column
        align-items: center
        grid-gap: 15px

.reset-password
    width: 100%
    display: flex
    flex-direction: column
    align-items: center
    grid-gap: 15px

.form-line
    display: flex
    grid-gap: 20px
    width: 100%

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