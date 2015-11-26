import { createSelector } from 'reselect';

function selectDeals(currentPriceGuides, allDealsListings) {
  let deals = [];
  
  currentPriceGuides.items.forEach(pg => {
    const dealslistings = allDealsListings[pg._links.self.href];
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

function canLoadMoreDeals(currentPriceGuides) {
  return currentPriceGuides.next !== null;
}

function isLoading(currentPriceGuides, allDealsListings) {
  if (currentPriceGuides.isFetching) {
    return true;
  } else {
    return currentPriceGuides.items.some(pg => {
      const dealsListings = allDealsListings[pg._links.self.href];
      return dealsListings && dealsListings.isFetching
    });
  }
}

const searchTermSelector = (state) => state.finder.searchTerm;
const selectedCategorySelector = (state) => state.finder.selectedCategory;
const priceGuidesSelector = (state) => state.finder.priceGuides;
const dealsListingsSelector = (state) => state.finder.dealsListings;
const categoriesSelector = (state) => state.finder.categories;
export default createSelector(
  [ searchTermSelector, selectedCategorySelector, priceGuidesSelector, dealsListingsSelector, categoriesSelector ],
  (searchTerm, selectedCategory, allPriceGuides, dealsListings, categories) => {
    let currentPriceGuides = [];
    
    if (searchTerm) {
      currentPriceGuides = allPriceGuides.bySearchTerm;
    } 
    else if (selectedCategory) {
      currentPriceGuides = allPriceGuides.byCategory[selectedCategory];
    }
    
    return {
      deals: selectDeals(currentPriceGuides, dealsListings),
      title: createTitle(searchTerm, selectedCategory, categories),
      canLoadMoreDeals: canLoadMoreDeals(currentPriceGuides),
      isLoading: isLoading(currentPriceGuides, dealsListings)
    }
  }
)