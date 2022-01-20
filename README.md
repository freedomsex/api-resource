# Api Resource

Api Resource mixin for freedomsex project. Depend _axios_, _axios-rest-api_

## Методы

### Ресурс

_async_ **loadCached**([id], [name], [force]) - получить объект по ID из кэша или загрузить если отсутствует. `force` - загрузить несмотря ни на что

_async_ **restoreItem**([name]) - получить объект из кэша

**restoreCachedItem**([name]) - сохранить список в кэш при условии, если есть и не шаблонный  

_async_ **refreshCachedItem**([name]) - загрузить несмотря ни на что и сохранить

### Список

_async_ **cachedList**(name, force) - получить список из кэша или загрузить если список отсутствует или пустой. `force` - загрузить несмотря ни на что

_async_ **restoreList**([name]) - получить список из кэша

**storeCachedList**([name]) - сохранить список в кэш как есть  

**restoreCachedList**([name]) - сохранить список в кэш при условии, если есть и не шаблонный  

_async_ **refreshCachedList**([name]) - загрузить несмотря ни на что и сохранить

