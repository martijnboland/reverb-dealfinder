import { createSelector } from 'reselect';

function createTitle(searchTerm, selectedCategory, categories, currentPriceGuides, deals) {
  if (searchTerm) {
    if ((! currentPriceGuides.next) && deals.length === 0) {
      return `No deals found for '${searchTerm}'`;
    } else {
      return `Deals found for '${searchTerm}'`;    
    }
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
const isWideSelector = (state) => state.layout.isWide;

export default createSelector(
  [ searchTermSelector, selectedCategorySelector, priceGuidesSelector, dealsListingsSelector, categoriesSelector, isWideSelector ],
  (searchTerm, selectedCategory, allPriceGuides, dealsListings, categories, isWide) => {
    const defaultPriceGuides = {
      items: []
    };
    let currentPriceGuides = defaultPriceGuides;
    
    if (searchTerm) {
      currentPriceGuides = allPriceGuides.bySearchTerm || defaultPriceGuides;
    } 
    else if (selectedCategory) {
      currentPriceGuides = allPriceGuides.byCategory[selectedCategory] || defaultPriceGuides;
    }
    
    let deals = [];
  
    currentPriceGuides.items.forEach(pg => {
      const dealslistingsForCurrentPriceGuides = dealsListings[pg._links.self.href];
      if (dealslistingsForCurrentPriceGuides && dealslistingsForCurrentPriceGuides.items.length > 0) {
        for (var i = 0; i < dealslistingsForCurrentPriceGuides.items.length; i++) {
          const listing = dealslistingsForCurrentPriceGuides.items[i];
          if (! deals.some(d => d.link === listing.link)) {
            deals.push(listing);                    
          }
        }  
      } 
    });
        
    return {
      searchTerm: searchTerm,
      selectedCategory: selectedCategory,
      deals: deals,
      title: createTitle(searchTerm, selectedCategory, categories, currentPriceGuides, deals),
      canLoadMoreDeals: canLoadMoreDeals(currentPriceGuides),
      isLoading: isLoading(currentPriceGuides, dealsListings),
      isWide: isWide
    }
  }
)