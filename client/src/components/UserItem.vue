<template>
    <div class="user" v-if="user">
        <div class="user__column">
            <span>Name</span>
            <p>{{ user.username }}</p>
        </div>
        <div class="user__column user__column--small">
            <span>Block</span>
            <div 
                :class="['radar', {'radar--on': user.block}]"
                @click="blockUser([user.username, user.block])"
                v-if="!isAdmin"
            ></div>
        </div>
        <div class="user__column">
            <span>Password option</span>
            <div class="user__options" v-if="!isAdmin">
                <div>
                    <input 
                        type="checkbox" 
                        :id="`lowercase-${user.username}`" 
                        :checked="user.options.lowercase" 
                        v-model="passOption.lowercase"
                        @change="changePassOption"
                    >
                    <label :for="`lowercase-${user.username}`">LOW</label>
                </div>
                <div>
                    <input 
                        type="checkbox" 
                        :id="`uppercase-${user.username}`" 
                        :checked="user.options.uppercase" 
                        v-model="passOption.uppercase"
                        @change="changePassOption"
                    >
                    <label :for="`uppercase-${user.username}`">UPP</label>
                </div>
                <div>
                    <input 
                        type="checkbox" 
                        :id="`numbers-${user.username}`" 
                        :checked="user.options.numbers" 
                        v-model="passOption.numbers"
                        @change="changePassOption"
                    >
                    <label :for="`numbers-${user.username}`">NUM</label>
                </div>
                <div>
                    <input 
                        type="checkbox" 
                        :id="`special-${user.username}`" 
                        :checked="user.options.special" 
                        v-model="passOption.special"
                        @change="changePassOption"
                    >
                    <label :for="`special-${user.username}`">SPEC</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'UserItem',
    data() {
        return {
            passOption: {
                lowercase: false,
                uppercase: false,
                numbers: false,
                special: false
            }
        }
    },  
    props: {
        user: {
            type: Object,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
    },
    mounted() {
        if (!this.user.options) return;

        const { lowercase, uppercase, numbers, special } = this.user.options;

        this.passOption = {
            lowercase: lowercase,
            uppercase: uppercase,
            numbers: numbers,
            special: special
        }
    },

    methods: {
        ...mapActions({
            blockUser: 'admin/blockUser',
            changeOption: 'admin/changeUserOption'
        }),

        changePassOption() {
            this.changeOption([this.passOption, this.user.username]);
        }
    },
}
</script>
  
<style scoped lang="sass">
.user
    display: flex
    grid-gap: 10px
    width: 100%
    max-width: 700px
    background: $purple
    padding: 15px
    border-radius: 15px
    color: $white

    &__column
        width: 40%
        border-right: 2px solid $blue
        display: flex
        flex-direction: column
        grid-gap: 10px

        &--small
            width: 20%

        &:last-child
            border: none

        & span
            font-size: 12px
            color: rgba($white, .7)

        & p
            font-weight: 600

        .radar
            width: 15px
            height: 15px
            background: $green
            border-radius: 50%
            cursor: pointer
            transition: $trs opacity

            &:hover
                opacity: .7

            &--on
                background: $orange


    &__options
        display: flex
        justify-content: space-between

        & > div
            display: flex
            flex-direction: column

        & label
            font-size: 14px
            margin-bottom: 5px
            cursor: pointer
            color: $white
            font-weight: 600
            transition: $trs 

            &:hover
                color: rgba($green, .5)

        & input
            cursor: pointer
            display: none

            &:checked
                & ~ label
                    color: $green
</style>  