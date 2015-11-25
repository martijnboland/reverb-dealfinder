import { createSelector } from 'reselect';

function selectDeals(searchTerm, selectedCategory, allPriceGuides, allDealsListings) {
  let deals = [];
  let priceGuides = [];
  
  if (searchTerm) {
    priceGuides = allPriceGuides.bySearchTerm.items.map(pg => {
      return pg._links.self.href;
    });
  } 
  else if (selectedCategory) {
    if (allPriceGuides.byCategory[selectedCategory]) {
      priceGuides = allPriceGuides.byCategory[selectedCategory].items.map(pg => {
        return pg._links.self.href;
      });    
    }
  }
  
  priceGuides.forEach(pg => {
    const dealslistings = allDealsListings[pg];
    if (dealslistings) {
      deals.push(...dealslistings.items);    
    } 
  });
  return deals;
}

function createTitle(searchTerm, selectedCategory, categories) {
  if (searchTerm) {
    return `Deals found for '${searchTerm}'`;
  }
  if (selectedCategory) {
    const category = categories.items.find(el => {
      return el.slug === selectedCategory;
    })
    return `Deals in category ${category.name}`;
  }
}

const searchTermSelector = (state) => state.finder.searchTerm;
const selectedCategorySelector = (state) => state.finder.selectedCategory;
const priceGuidesSelector = (state) => state.finder.priceGuides;
const dealsListingsSelector = (state) => state.finder.dealsListings;
const categoriesSelector = (state) => state.finder.categories;
export default createSelector(
  [ searchTermSelector, selectedCategorySelector, priceGuidesSelector, dealsListingsSelector, categoriesSelector ],
  (searchTerm, selectedCategory, priceGuides, dealsListings, categories) => {
    return {
      deals: selectDeals(searchTerm, selectedCategory, priceGuides, dealsListings),
      title: createTitle(searchTerm, selectedCategory, categories)
    }
  }
)