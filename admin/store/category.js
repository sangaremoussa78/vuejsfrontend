import { CategoryApi } from '../api/category';

export const state = () => ({
  category: {
    title: '',
    parent_id: '',
    description: ''
  },
  categoryHtmlTree: '',
  features: [
  ],
  filterData: {
    id: '',
    title: '',
    parent_id: ''
  },
  page: 1,
  categoryList: {}
});

export const mutations = {
  setTitle(state, title) {
    state.category.title = title;
  },
  setParentId(state, parent_id) {
    state.category.parent_id = parent_id;
  },
  setDescription(state, description) {
    state.category.description = description;
  },
  setCategoryHtmlTree(state, tree) {
    state.categoryHtmlTree = tree;
  },
  resetCategory(state) {
    state.category = {
        title: '',
        parent_id: '',
        description: ''
    };
    state.features = [];
  },
  setFeatures(state, value) {
    state.features = value;
  },
  addToFeatures(state, row) {
    state.features.push(row);
  },
  removeFromFeature(state, id) {
    state.features = [...state.features.filter(item => item.id !== id)];
  },
  updateFeatureTitle(state, payload) {
    let features = [...state.features];
    features.map(feature => {
      if(feature.id == payload.id) {
        feature.field_title = payload.value;
      }
    });

    state.features = features;
  },
  updateFeatureType(state, payload) {
    let features = [...state.features];
    features.map(feature => {
      if(feature.id == payload.id) {
        feature.field_type = payload.value;
      }
    });

    state.features = features;
  },
  setCategoryList(state, category_list) {
    state.categoryList = category_list;
  },
  setPage(state, page) {
    state.page = page;
  },
  setFilterData(state, value) {
    state.filterData[value.key] = value.val;
  }
};

export const actions = {
  getCategoryHtmlTree({commit}, exceptId = null) {
    CategoryApi.getCategoriesHtmlTree(this.$axios, exceptId).then(response => {
      let html = '<option value="">none</option>';
      html += response;
      commit('setCategoryHtmlTree', html);
    });
  },
  create({commit}, payload) {

    commit('shared/resetStatusMessagesParameters', null, {root: true});
    commit('shared/setStatusMessageParameter', {key: 'showLoading', val: true}, {root: true});

    const dataToSend = payload.data;
    dataToSend.features = payload.features;

    CategoryApi.create(this.$axios, dataToSend).then(response => {
      commit('shared/setStatusMessageParameter', {key: 'showLoading', val: false}, {root: true});
      if(response.success) {
        commit('shared/setStatusMessageParameter', {key: 'success_message', val: response.message}, {root: true});
      }

      setTimeout(() => {
        payload.router.push('/category');
      }, 2000);

    }).catch(err => {
      commit('shared/setStatusMessageParameter', {key: 'showLoading', val: false}, {root: true});
      if(err.response.data) {
        commit('shared/setStatusMessageParameter', {key: 'error_message', val: err.response.data.message}, {root: true});
        if(err.response.data.errors) {
          let errors = [];
          for(let key in err.response.data.errors) {
            errors.push(err.response.data.errors[key][0]);
          }

          commit('shared/setStatusMessageParameter', {key: 'validation_errors', val: errors}, {root: true});
        }
      }
    }).finally(() => {
      setTimeout(() => {
        commit('shared/resetStatusMessagesParameters', null, {root: true});
        commit('resetCategory');
      }, 3000);
    });
  },
  listCategories({commit}, payload = null) {
    CategoryApi.list(this.$axios, payload).then(response => {
      commit('setCategoryList', response.categories);
    });
  },
  deleteCategory({commit, state}, id) {
    commit('shared/resetStatusMessagesParameters', null, {root: true});
    commit('shared/setStatusMessageParameter', {key: 'showLoading', val: true}, {root: true});

    CategoryApi.delete(this.$axios, id).then(response => {
      commit('shared/setStatusMessageParameter', {key: 'showLoading', val: false}, {root: true});
      if(response.success) {

        let categoryList = {...state.categoryList};
        categoryList.data = categoryList.data.filter(item => item.id !== id);

        commit('setCategoryList', categoryList);
        commit('shared/setStatusMessageParameter', {key: 'success_message', val: response.message}, {root: true});
      }
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setTimeout(() => {
        commit('shared/resetStatusMessagesParameters', null, {root: true});
      }, 3000);
    });
  },
  showCategory({commit}, id) {
    commit('shared/resetStatusMessagesParameters', null, {root: true});
    commit('shared/setStatusMessageParameter', {key: 'showLoading', val: true}, {root: true});

    CategoryApi.show(this.$axios, id).then(response => {
      commit('shared/setStatusMessageParameter', {key: 'showLoading', val: false}, {root: true});

      if(response.category) {
        commit('setTitle', response.category.title);
        commit('setDescription', response.category.description);
        commit('setParentId', response.category.parent_id);

        // set features
        if(response.category.features) {
           commit('setFeatures', response.category.features);
        }
      }

    }).catch(err => {
      console.log(err);
    });
  },
  updateCategory({commit}, payload) {
    commit('shared/resetStatusMessagesParameters', null, {root: true});
    commit('shared/setStatusMessageParameter', {key: 'showLoading', val: true}, {root: true});

    CategoryApi.update(this.$axios, payload.data, payload.id).then(response => {
      commit('shared/setStatusMessageParameter', {key: 'showLoading', val: false}, {root: true});
      if(response.success) {
        commit('shared/setStatusMessageParameter', {key: 'success_message', val: response.message}, {root: true});
      }

      setTimeout(() => {
        payload.router.push('/category');
      }, 2000);

    }).catch(err => {
      commit('shared/setStatusMessageParameter', {key: 'showLoading', val: false}, {root: true});
      if(err.response.data) {
        commit('shared/setStatusMessageParameter', {key: 'error_message', val: err.response.data.message}, {root: true});
        if(err.response.data.errors) {
          let errors = [];
          for(let key in err.response.data.errors) {
            errors.push(err.response.data.errors[key][0]);
          }

          commit('shared/setStatusMessageParameter', {key: 'validation_errors', val: errors}, {root: true});
        }
      }
    }).finally(() => {
      setTimeout(() => {
        commit('shared/resetStatusMessagesParameters', null, {root: true});
        commit('resetCategory');
      }, 3000);
    });
  }
};
