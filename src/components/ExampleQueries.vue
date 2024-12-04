<template>
    <Transition>
        <div v-if="loaded" class="mt-6 flex flex-wrap justify-center gap-2">
            <button v-for="(query, index) in randomQueries" :key="index" @click="setQueryAndSubmit(query.query)"
                class="bg-gray-100 hover:bg-gray-50 text-gray-700 text-sm py-2 px-4 rounded-full border border-purple-200">
                {{ query.title }}
            </button>
        </div>
    </Transition>
</template>

<script>
export default {
    name: "ExampleQueries",
    props: {
        setQueryAndSubmit: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            loaded: false,
            exampleQueries: [
                { title: '🌍 Does climate change affect mental health?', query: 'Does climate change affect mental health?' },
                { title: '🌡️ How does urban heat affect public health?', query: 'How does urban heat affect public health?' },
                { title: '🧬 Can gene editing cure genetic disorders?', query: 'Can gene editing cure genetic disorders?' },
                { title: '🍽️ Does intermittent fasting improve metabolism?', query: 'Does intermittent fasting improve metabolism?' },
                { title: '🚗 Will electric vehicles reduce carbon emissions?', query: 'Will electric vehicles reduce carbon emissions?' },
                { title: '💊 Can probiotics improve mental health?', query: 'Can probiotics improve mental health?' },
                { title: '🌾 Is organic farming sustainable?', query: 'Is organic farming sustainable?' },
                { title: '📈 Does social media impact self-esteem?', query: 'Does social media impact self-esteem?' },
                { title: '🔬 Are there new treatments for Alzheimers disease?', query: 'Are there new treatments for Alzheimers disease?' },
                { title: '👩‍💻 Does remote work improve productivity?', query: 'Does remote work improve productivity?' },
                { title: '🧠 Does zinc help with depression?', query: 'Does zinc help with depression?' },
{ title: '🌿 Can meditation reduce anxiety?', query: 'Can meditation reduce anxiety?' },
{ title: '🍵 Does green tea improve brain function?', query: 'Does green tea improve brain function?' },
{ title: '💡 Is artificial intelligence improving healthcare?', query: 'Is artificial intelligence improving healthcare?' },
{ title: '🌍 Does deforestation accelerate climate change?', query: 'Does deforestation accelerate climate change?' },
{ title: '📚 Do audiobooks improve learning?', query: 'Do audiobooks improve learning?' },
                { title: '🧠 Does exercise affect cognitive function?', query: 'Does exercise affect cognitive function?' },
                { title: '🤰 Are flu vaccines safe for pregnant women?', query: 'Are flu vaccines safe for pregnant women?' },
                { title: '📉 Does quantitative easing influence interest rates?', query: 'Does quantitative easing influence interest rates?' },
                { title: '🧪 Are neural stem cell-derived exosomes involved in microvascular regeneration?', query: 'Are neural stem cell-derived exosomes involved in microvascular regeneration?' },
                { title: '📄 bioRxiv doi.org/10.1101/2024.01.24.576910', query: `Identifying goal-relevant features in novel environments is a central challenge for efficient behaviour. We asked whether humans address this challenge by relying on prior knowledge about common properties of reward-predicting features. One such property is the rate of change of features, given that behaviourally relevant processes tend to change on a slower timescale than noise. Hence, we asked whether humans are biased to learn more when task-relevant features are slow rather than fast. To test this idea, 100 human participants were asked to learn the rewards of two-dimensional bandits when either a slowly or quickly changing feature of the bandit predicted reward. Participants accrued more reward and achieved better generalisation to unseen feature values when a bandit’s relevant feature changed slowly, and its irrelevant feature quickly, as compared to the opposite. Participants were also more likely to incorrectly base their choices on the irrelevant feature when it changed slowly versus quickly. These effects were stronger when participants experienced the feature speed before learning about rewards. Modelling this behaviour with a set of four function approximation Kalman filter models that embodied alternative hypotheses about how feature speed could affect learning revealed that participants had a higher learning rate for the slow feature, and adjusted their learning to both the relevance and the speed of feature changes. The larger the improvement in participants’ performance for slow compared to fast bandits, the more strongly they adjusted their learning rates. These results provide evidence that human reinforcement learning favours slower features, suggesting a bias in how humans approach reward learning.` },
                { title: '📄 medRxiv doi.org/10.1101/2024.10.23.24309838', query: `Anthropogenic forcing is increasing the likelihood and severity of certain extreme weather events, which may catalyze outbreaks of climate-sensitive infectious diseases. Extreme precipitation events can promote the spread of mosquito-borne illnesses by creating vector habitat, destroying infrastructure, and impeding vector control. Here, we focus on Cyclone Yaku, which caused heavy rainfall in northwestern Peru from March 7th - 20th, 2023 and was followed by the worst dengue outbreak in Peru's history. We apply generalized synthetic control methods to account for baseline climate variation and unobserved confounders when estimating the causal effect of Cyclone Yaku on dengue cases across the 56 districts with the greatest precipitation anomalies. We estimate that 67 (95% CI: 30 - 87)% of cases in cyclone-affected districts were attributable to Cyclone Yaku. The cyclone significantly increased cases for over six months, causing 38,209 (95% CI: 17,454 - 49,928) out of 57,246 cases. The largest increases in dengue incidence due to Cyclone Yaku occurred in districts with a large share of low-quality roofs and walls in residences, greater flood risk, and warmer temperatures above 24°C. Analyzing an ensemble of climate model simulations, we found that extremely intense March precipitation in northwestern Peru is 42% more likely in the current era compared to a preindustrial baseline due to climate forcing. In sum, extreme precipitation like that associated with Cyclone Yaku has become more likely with climate change, and Cyclone Yaku caused the majority of dengue cases across the cyclone-affected districts.` },
                { title: '📄 arxiv doi.org/10.48550/arXiv.2304.11111', query: `Large language models (LLMs) are transforming research on machine learning while galvanizing public debates. Understanding not only when these models work well and succeed but also why they fail and misbehave is of great societal relevance. We propose to turn the lens of psychiatry, a framework used to describe and modify maladaptive behavior, to the outputs produced by these models. We focus on twelve established LLMs and subject them to a questionnaire commonly used in psychiatry. Our results show that six of the latest LLMs respond robustly to the anxiety questionnaire, producing comparable anxiety scores to humans. Moreover, the LLMs' responses can be predictably changed by using anxiety-inducing prompts. Anxiety-induction not only influences LLMs' scores on an anxiety questionnaire but also influences their behavior in a previously-established benchmark measuring biases such as racism and ageism. Importantly, greater anxiety-inducing text leads to stronger increases in biases, suggesting that how anxiously a prompt is communicated to large language models has a strong influence on their behavior in applied settings. These results demonstrate the usefulness of methods taken from psychiatry for studying the capable algorithms to which we increasingly delegate authority and autonomy.` }
            ]
        };
    },
    computed: {
        randomQueries() {
            // Shuffle and pick the first 5 items
            return this.exampleQueries
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
                .slice(0, 10);
        }
    },
    mounted() {
        setTimeout(() => {
            this.loaded = true;
        }, 5);
    }

};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>