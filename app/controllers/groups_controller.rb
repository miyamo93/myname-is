class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]
  before_action :sign_in_required, only: [:index]

  def index
  end

  def new
    @group = Group.new
    @group.users << current_user
  end
  
  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to groups_path(@group), notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def update
    if @group.update(group_params)
      redirect_to groups_path(@group), notice: 'グループを更新しました'
    else
      render :edit
    end
  end

  def edit
    @group = Group.find(params[:id])
    @users = @group.users
  end

  private

  def group_params
    params.require(:group).permit(:name,user_ids: [])
  end
  
  def set_group
    @group = Group.find(params[:id])
  end
end
