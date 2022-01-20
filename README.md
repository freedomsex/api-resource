# Api Resource

Api Resource mixin for freedomsex project. Depend _axios_, _axios-rest-api_

## Настройка

Путем указания параметров DATA расширяемого компонетна.

```js
    resource: {
      name: 'users', // Имя ресурса
      isPublic: true, // Нужна ли авторизация
      params: {
        id: null // Идентификатор ресурса
    },
    subresource: {
      name: 'invites' 
      // Суб ресурс (/api/resurce_name/10/sub_resurce_name)
      // Пример /api/users/10/likes
    },
```

`resource.name` - если указвн, можно не указывать `name` в методах
`resource.params.id` - если указан, можно не указывать `id` в методах

## Методы

### Общие

Если указан ID получает объект, иначе список. Онисание в методах далее

**restoreData**([name]) - restoreItem|restoreList

**storeCached**([name]) - storeCachedItem|storeCachedList

**restoreCached**([name]) - restoreCachedItem|restoreCachedList

**reloadCached**([id], [name]) - reloadCachedItem|reloadCachedList

### Ресурс

_async_ **loadCached**([id], [name], [force]) - получить объект по ID из кэша или загрузить если отсутствует. `force` - загрузить несмотря ни на что

**loadCachedItem**([id], [name], [force]) - получить объект по ID из кэша, если отсутствует или шаблонный

_async_ **restoreItem**([name]) - получить объект из кэша несмотря ни на что

**restoreCachedItem**([name]) - сохранить список в кэш при условии, если есть и не шаблонный  

_async_ **refreshCachedItem**([id], [name]) - загрузить несмотря ни на что и сохранить. `hard` - игнорировать существующие данные

### Список

_async_ **cachedList**(name, force) - получить список из кэша или загрузить если список отсутствует или пустой. `force` - загрузить несмотря ни на что

**loadCachedList**([name], [force]) - получить список из кэша, если список пустой или шаблонный

**reloadCachedList**([name]) - сохранить список в кэш при условии, если есть и не шаблонный, и получить список из кэша, если список пустой или шаблонный

_async_ **restoreList**([name]) - получить список из кэша несмотря ни на что

**storeCachedList**([name]) - сохранить список в кэш как есть  

**restoreCachedList**([name]) - сохранить список в кэш при условии, если есть и не шаблонный  

_async_ **refreshCachedList**([name]) - загрузить несмотря ни на что и сохранить. `hard` - игнорировать существующие данные
