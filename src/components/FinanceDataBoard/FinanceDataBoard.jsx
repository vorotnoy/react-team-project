import { useState } from 'react';
import s from './FinanceDataBoard.module.scss';
import Modal from 'components/Modal/Modal';
import { FinanceModalForm } from 'components/FinanceModalForm/FinanceModalForm';
import { postTransaction } from 'redux/operations/cashflowOperations';
import { useDispatch } from 'react-redux';

export const FinanceDataBoard = ({
  BoardTitle = null,
  yearValue = 0,
  monthValue = 0,
  onSubmit,
  dailyLimit,
  monthLimit,
}) => {
  const [showModalWindow, setShowModalWindow] = useState(false);
  const handleModalWindowOpen = () => setShowModalWindow(true);
  const handleModalWindowClose = () => setShowModalWindow(false);

  const [sum, setSum] = useState(0);
  const dispatch = useDispatch();
  const handleGetModal = () => {
    const form = {
      sum,
      type: 'income',
    };
    dispatch(postTransaction(form));
    handleModalWindowClose();
  };

  return (
    <>
      {BoardTitle ? (
        <div className={s.BoardWrapper}>
          <span className={s.BoardTitle}>{BoardTitle}</span>
          <div className={s.FlexWrapper}>
            <div className={s.DataFieldWrapper}>
              <label>
                <span className={s.DataLabel}>Number of years</span>
              </label>
              <input
                className={s.DataDisplayField}
                type="text"
                value={yearValue && `${yearValue} years`}
                readOnly
              />
            </div>
            <div className={s.DataFieldWrapper}>
              <label>
                <span className={s.DataLabel}>Number of months</span>
              </label>
              <input
                className={s.DataDisplayField}
                type="text"
                value={monthValue && `${monthValue} months`}
                readOnly
              />
            </div>
            <div className={s.BoardButtonsWrapper}>
              <button className={s.FitsBtn} type="submit">
                Fits
              </button>
              <button
                className={s.AddBalanceBtn}
                onClick={handleModalWindowOpen}
                type="button"
              >
                Add Balance
              </button>
              {showModalWindow && (
                <Modal closeModal={handleModalWindowClose}>
                  <FinanceModalForm
                    handleToggle={handleModalWindowClose}
                    title={'Enter balance'}
                  />
                </Modal>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={s.DailyBoardWrapper}>
          <span className={s.BoardTitle}>{BoardTitle}</span>
          <div className={s.DailyFlexWrapper}>
            <div className={s.DataFieldWrapper}>
              <input
                className={s.DataDisplayField}
                type="text"
                placeholder={`-${dailyLimit}$`}
                readOnly
              />
              <label>
                <span className={s.DataLabelDaily}>Daily limit</span>
              </label>
            </div>
            <div className={s.DataFieldWrapper}>
              <input
                className={s.DataDisplayField}
                type="text"
                placeholder={`-${monthLimit}$`}
                readOnly
                onChange={e => setSum(e.target.value)}
              />
              <label>
                <span className={s.DataLabelDaily}>Monthly Limit</span>
              </label>
            </div>
            <div className={s.DailyBoardButtonsWrapper}>
              <button className={s.ReadyBtn} type="submit" onClick={onSubmit}>
                Ready
              </button>
              <button
                className={s.AddIncomeBtn}
                onClick={handleModalWindowOpen}
                type="button"
              >
                Add income
              </button>
              {showModalWindow && (
                <Modal closeModal={handleModalWindowClose}>
                  <FinanceModalForm
                    handleToggle={handleModalWindowClose}
                    title={'Enter income'}
                    handleGetModal={handleGetModal}
                  />
                </Modal>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
