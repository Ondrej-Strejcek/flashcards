<template>
    <InformationCard header="404" text="Make sure you have spelled url correctly." btnTitle="Home" to="/" />
</template>

<script>
import InformationCard from '../../components/InformationCard'

export default {
    name: 'Missing',
    components: {
        InformationCard
    }
}
</script>