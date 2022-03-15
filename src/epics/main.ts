import { of } from 'rxjs';
import { mergeMap, map, catchError, finalize } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { message } from 'antd';
import { _http } from '../http.service';

import { actions } from '../redux/actions';

const { updateAsyncData, updateErrInfo, asyncActionType } = actions;

export const demoEpic = (action$: any, state$: any) =>
  action$.pipe(
    ofType(asyncActionType),
    mergeMap((action: any) => {
      const { token } = state$.value.main;
      return _http.post('/async/action', {
        actionPayload: action.payload,
        token
      }).pipe(
        map(({ response: { code, msg, data } }: any) => {
          if (code !== 0) {
            throw Error(msg);
          }
          return updateAsyncData(['async result ']);
        }),
        catchError(({ message: err }: any) => {
          message.error(err);
          return of(updateErrInfo(err));
        })
      );
    }),
    catchError(({ message: err }: any) => {
      message.error(err);
      return of(updateErrInfo(err));
    })
  );

/*  demo
export const getMarkerDataEpic = (action$: any, state$: any) =>
  action$.pipe(
    ofType(FETCH_MARKER_DATA),
    mergeMap((action: any) => {
      const {
        deliveryDate,
        warehouseId,
        orderType,
        solutionType,
        deliveryGroupId,
        selectedSubSite: subSiteIds,
        selectedServiceStation,
        serviceStationList,
        workspaceId,
        subSiteList,
        selectedTC,
        tcList,
      } = state$.value.map.main;
      let isAll: boolean = subSiteIds.includes("all");
      let params = {
        serviceStationIdList: isAll
          ? serviceStationList.map(({ value }: any) =>
            value.replace("service:", "")
          )
          : selectedServiceStation,
        subSiteIdList: isAll
          ? subSiteList.map(({ value }: any) => value)
          : subSiteIds.filter((v: string) => !isServiceOrTC.test(v)),

        tcIdList: isAll
          ? tcList.map(({ value }: any) => value.replace("tc:", ""))
          : selectedTC,
      };

      return concat(
        of(Actions.updateLoadingStatus(true)),
        Ajax.post("/tms/visual-line/get-map-pointinfo", {
          deliveryDate: deliveryDate.format("YYYY-MM-DD"),
          warehouseId,
          deliveryType: solutionType,
          lineIdList: [],
          isDelivery: 0,
          groupId: deliveryGroupId,
          hasOrder: orderType,
          workAreaId: workspaceId,
          ...params,
        }).pipe(
          map(({ response: { code, msg, data } }) => {
            if (code !== 0) {
              throw Error(msg);
            }
            const {
              partnerDtoMap: orderIdToPartnerMap,
              lineAndSiteMap: lineMap,
              lineResultMap: lineInfoMap,
              lineSortList,
              needDisplayDispatchOrderIdList: needDispatchList,
            } = data;
            const sortedLineMap: any = {};
            const sortedLineList: any[] = [];
            const line: any = {
              "0": { id: "0", lineName: "0", driver: "", licensePlate: "" },
            };
            let sortedList: string[] = [];

            Colors.value = 0; // reset
            Object.keys(lineInfoMap).forEach((v: any) => {
              line[v] = Adaptor.convertLine(lineInfoMap[v]);
              line[v].list = [];
            });

            {
              let tempServiceMap: IdsToList = {};
              let tempSubSiteMap: IdsToList = {};
              const allPartnerList: any[] = Object.values(orderIdToPartnerMap);

              for (let {
                dispatchOrderId: id,
                serviceStationId: serviceId,
                subsiteId: subSiteId,
                tcId,
              } of allPartnerList) {
                let isSubSite: boolean = serviceId == null && tcId == null;
                let temp: IdsToList = isSubSite
                  ? tempSubSiteMap
                  : tempServiceMap;
                let tempKey: string | number = isSubSite
                  ? subSiteId
                  : serviceId || tcId;
                if (temp[tempKey]) {
                  temp[tempKey].push(id);
                  continue;
                }
                temp[tempKey] = [id];
              }
              setTimeout(() => {
                store.dispatch(
                  Actions.updateSubSiteIdToDispatchOrderIdMap(tempSubSiteMap)
                );
                store.dispatch(
                  Actions.updateServiceIdToDispatchOrderIdMap(tempServiceMap)
                );
              }, 1000);
            }

            let allPartner: any = Object.keys(orderIdToPartnerMap);

            Object.keys(lineMap).forEach((v: any) => {
              const temp: any[] = [];
              lineMap[v].forEach((vv: any) => {
                let item = Adaptor.convertItem(orderIdToPartnerMap[vv]);
                item.goodsValue !== 0 &&
                item.goodsNumber !== 0 &&
                temp.push(item);
              });

              for (let v of temp) {
                let index = allPartner.findIndex(
                  (value: any) => v.dispatchOrderId === value
                );
                allPartner.splice(index, 1);
              }

              line[v].list = temp;
              line[v].stationType = (temp[0] && temp[0].stationType) || null;
              line[v].stationId = (temp[0] && temp[0].stationId) || null;
            });

            let unDispatchList = allPartner.map((v: any) =>
              Adaptor.convertItem(orderIdToPartnerMap[v])
            );
            line["0"].list = unDispatchList.filter(
              ({ goodsValue, goodsNumber }: any) =>
                goodsValue !== 0 && goodsNumber !== 0
            );
            sortedList = lineSortList.sort();
            sortedList.push("0");

            for (let i = 0, len = sortedList.length; i < len; i++) {
              let v = sortedList[i];
              const id: string = v === "0" ? "0" : createLineId();
              const { stationId } = line[v];
              const isErrorData = stationId == null;
              const { stationId: stationIdX, stationType } =
              line[v].list[0] || {};
              sortedLineList.push(
                Object.assign(
                  line[v],
                  {
                    id,
                    lineName: v,
                    color: v === "0" ? "#666" : Colors.value,
                  },
                  isErrorData && v !== "0"
                    ? { stationId: stationIdX, stationType }
                    : undefined
                )
              );
              sortedLineMap[id] = line[v];
            }

            let sortedLineListTemp: any = sortedLineList.filter(
              (v: any) => v.id !== "0"
            );

            let tempMileage = {};
            sortedLineList.forEach(({ id }) =>
              Object.assign(tempMileage, { [id]: { mileage: 0, duration: 0 } })
            );
            store.dispatch(Actions.updateSortedLineMap(sortedLineMap));
            store.dispatch(Actions.updateSortedLineList(sortedLineListTemp));
            store.dispatch(Actions.updateUnallocated([]));

            setTimeout(() => {
              store.dispatch(
                Actions.fetchMileage(
                  sortedLineListTemp
                    .filter(({ list }: any) => list.length > 0)
                    .map(({ id, list }: any) => ({
                      [id]: list.map(({ residentialId }: any) => residentialId),
                    }))
                )
              );
            }, 2000);
            markerNeedCreated$.next(
              [...Object.values(sortedLineMap)].map((v: any) =>
                v.list.map((vv: any) => Object.assign({}, vv, v))
              )
            );
            store.dispatch(
              Actions.updateNeedDispatchCount(needDispatchList.length)
            );
            store.dispatch(
              action.value
                ? Actions.fetchNeedDispatchList()
                : Actions.updateNeedDispatchList(needDispatchList)
            );
            lazyLoadLine$.next();
            return Actions.updateMileageMap(tempMileage);
          }),
          catchError(({ message: err }: any) => {
            message.error(err);
            return of(Actions.updateErrFetch(err));
          }),
          finalize(() => {
            store.dispatch(Actions.updateLoadingStatus(false));
          })
        )
      );
    }),
    catchError(({ message: err }: any) => {
      message.error(err);
      return of(Actions.updateErrFetch(err));
    })
  ); */
