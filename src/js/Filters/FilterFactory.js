import BWFilter from './BWFilter';
import VignetteFilter from './VignetteFilter';
import GrainFilter from './GrainFilter';
import DistortFilter from './DistortFilter';
import KaleidoscopeFilter from './KaleidoscopeFilter';

const BlurFilter = PIXI.filters.BlurFilter;

let _availableFilters = { BWFilter, VignetteFilter, BlurFilter, GrainFilter, DistortFilter, KaleidoscopeFilter };

class FilterFactory {
  static getClassByName(name) {
    if( typeof name === 'string' ) {
      if( _availableFilters[name] ) {
        return _availableFilters[name]
      }
    }
    return null;
  }
  static registerClass(classDef) {
    _availableFilters[classDef.name] = classDef;
  }
}

export default FilterFactory